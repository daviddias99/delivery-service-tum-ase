package com.ase.boxservice.service.serviceImpl;

import com.ase.boxservice.dto.BoxDto;
import com.ase.boxservice.entity.Box;
import com.ase.boxservice.entity.BoxStatus;
import com.ase.boxservice.repository.BoxRepository;
import com.ase.boxservice.service.BoxService;
import com.ase.client.DeliveryServiceClient;
import com.ase.client.UserServiceClient;
import com.ase.client.com.ase.contract.DeliveryClientDto;
import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.client.com.ase.contract.UserDto;
import com.ase.client.entity.DeliveryStatus;
import com.ase.client.entity.StatusDelivery;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service(value = "boxService")
public class BoxServiceImpl implements BoxService {
    @Autowired
    private BoxRepository boxRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserServiceClient userServiceClient;


    @Autowired
    private DeliveryServiceClient deliveryServiceClient;

    @Autowired
    ResponseMessage responseMessage;

    private String fixedCookie = "jwt=eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6W3sicm9sZSI6IlJPTEVfQk9YIn1dLCJzdWIiOiJCT1giLCJpc3MiOiJhc2VEZWxpdmVyeSIsImlhdCI6MTY0MjAwNTE2OCwiZXhwIjo0MDcyMzUxMjQxfQ.UHdagX4q4DD-3rZd9XoDChRZ926iN0WSqibuXZqI4B3TS5T1PT_Vz1UN_UzpQFxTDWd1Cze7Kj67veeWWA4ZOyHY14At_IHVdcVZqZF2ezxwrKXNKOeHZB7_gFtHqc27uscjf6CbckpCcgnML9r857BMNlOO3kf--Tz1pyYlK-jJzz6sj_sSW1RNln6MZmi6_K59vZryemvFkth4cukKzUkwsNzOu6H2nJtY0Cqhqp5OPKf1QOEKRUgE_aX6EBVf8598aFp3YNoUU9y8HravhiMKV1Y9jDt89sIn_Mf86wpAAnk-zkRAeWdPLvHQRNwRarGWYkBrZb9qZcdCz-AJ1g";


    @Override
    @Transactional
    public BoxDto save(BoxDto boxDto) {

        if(boxRepository.existsByName(boxDto.getName()).booleanValue()  || boxDto.getName()==null  || boxDto.getName().equals("")){
            return null;
        }
        Box tempBox = modelMapper.map(boxDto, Box.class);
        tempBox.setStatus(BoxStatus.free);
        tempBox = boxRepository.save(tempBox);
        boxDto.setId(tempBox.getId());
        return boxDto;
    }

    @Override
    public BoxDto getById(String id) {
        if(!boxRepository.existsById(new ObjectId(id)).booleanValue())
            return null;
        Box tempBox = boxRepository.findById(new ObjectId(id));

        return modelMapper.map(tempBox, BoxDto.class);
    }


    @Override
    public List<BoxDto> getAll() {
        List<Box> data = boxRepository.findAll();
        return Arrays.asList(modelMapper.map(data, BoxDto[].class));
    }

    @Override
    public Boolean deleteBox(String id) {
        ObjectId objectId = new ObjectId(id);
        if(boxRepository.existsById(objectId).booleanValue()) {
            Box dbBox = boxRepository.findById(objectId);
            if (dbBox.getStatus() == BoxStatus.free) {
                dbBox.setStatus(BoxStatus.inactive);
                boxRepository.save(dbBox);
                return true;
            }
        }
        return false;
    }

    @Override
    public BoxDto updateBox(BoxDto boxDto, String id) {

        Box dbBox = boxRepository.findById(new ObjectId(id));

        if(dbBox==null){
            return null;
        }

        dbBox.setName(boxDto.getName());
        dbBox.setAddress(boxDto.getAddress());
        dbBox.setStatus(boxDto.getStatus());
        boxRepository.save(dbBox);

        return boxDto;
    }

    @Override
    public ResponseMessage checkIfTheRfidIsValidForTheBox(String rfId, String boxId) {
        ResponseEntity<UserDto> userDtoResponseEntity = userServiceClient.getByRfId(fixedCookie, rfId);
        UserDto userDto = userDtoResponseEntity.getBody();
        if(userDto == null){
            responseMessage.setResponseMessage("User doesn't exist with rfid: " + rfId);
            responseMessage.setResponseType(0);
            return responseMessage;
        }
        String userId = userDto.getId();
        BoxDto boxDto = getById(boxId);
        if(boxDto == null){
            responseMessage.setResponseMessage("Box doesn't exist with box ID: " + boxId);
            responseMessage.setResponseType(0);
            return responseMessage;
        }
        if(boxDto.getStatus() == BoxStatus.inactive){
            responseMessage.setResponseMessage("Box is inactive!");
            responseMessage.setResponseType(0);
            return responseMessage;
        }

        if(userDto.getRole().equalsIgnoreCase("deliverer")){
            List<DeliveryClientDto> deliveryDtoList = deliveryServiceClient.getAllDeliveriesByDelivererId(fixedCookie,userId).getBody();
            for (DeliveryClientDto delivery : deliveryDtoList){
                if(delivery.getBox().getId().equals(boxId)){

                    ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();

                    if (statusList.get(0).getDeliveryStatus() != DeliveryStatus.dispatched) {
                        responseMessage.setResponseMessage("Bad delivery status! Status is not dispatched! It is " + statusList.get(0).getDeliveryStatus());
                        responseMessage.setResponseType(0);
                        return responseMessage;
                    }
                    responseMessage.setResponseMessage("Deliverer allowed to open!");
                    responseMessage.setResponseType(1);
                    return responseMessage;
                }
            }
            responseMessage.setResponseMessage("The box is not assigned to the deliverer");
            responseMessage.setResponseType(0);

        }else if (userDto.getRole().equalsIgnoreCase("customer")) {
            List<DeliveryClientDto> deliveryDtoList = deliveryServiceClient.getAllDeliveriesByCustomerId(fixedCookie, userId).getBody();
            for (DeliveryClientDto delivery : deliveryDtoList){
                if(delivery.getBox().getId().equals(boxId)){
                    ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();
                    if (statusList.get(0).getDeliveryStatus() != DeliveryStatus.delivered) {
                        responseMessage.setResponseMessage("Bad delivery status!Status is not delivered! it is " + statusList.get(0).getDeliveryStatus());
                        responseMessage.setResponseType(0);
                        return responseMessage;
                    }
                    responseMessage.setResponseMessage("Customer allowed to open the box");
                    responseMessage.setResponseType(1);
                    return responseMessage;
                }
            }
            responseMessage.setResponseMessage("THe box is not assigned to the customer");
            responseMessage.setResponseType(0);

        }else if (userDto.getRole().equalsIgnoreCase("dispatcher")){
            responseMessage.setResponseMessage("UserId belongs to a dispatcher! ");
            responseMessage.setResponseType(0);
            return responseMessage;
        }else {
            responseMessage.setResponseMessage("UserId belongs to no one! user Role is : " +userDto.getRole());
            responseMessage.setResponseType(0);
            return responseMessage;
        }
        return responseMessage;

    }

    @Override
    public ResponseMessage closeBox(String rfId, String boxId) {
        ResponseEntity<UserDto> userDtoResponseEntity = userServiceClient.getByRfId(fixedCookie, rfId);
        if(userDtoResponseEntity.getBody() == null){
            responseMessage.setResponseMessage("User doesn't exist with rfid: " + rfId );
            responseMessage.setResponseType(0);
            return responseMessage;
        }
        UserDto userDto = userDtoResponseEntity.getBody();
        String userId = userDto.getId();
        BoxDto boxDto = getById(boxId);
        if(boxDto == null){
            responseMessage.setResponseMessage("Box doesn't exist with box ID: " + boxId);
            responseMessage.setResponseType(0);
            return responseMessage;
        }
        if(boxDto.getStatus() == BoxStatus.inactive){
            responseMessage.setResponseMessage("Box is inactive!");
            responseMessage.setResponseType(0);
            return responseMessage;
        }

        if(userDto.getRole().equalsIgnoreCase("deliverer")){
            List<DeliveryClientDto> deliveryDtoList = deliveryServiceClient.getAllDeliveriesByDelivererId(fixedCookie,userId).getBody();
            boolean deliveryAssignedToDeliverer = false;
            for (DeliveryClientDto delivery : deliveryDtoList){
                if(delivery.getBox().getId().equals(boxId)){
                    deliveryAssignedToDeliverer = true;
                    ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();

                    if (statusList.get(0).getDeliveryStatus() != DeliveryStatus.dispatched) {
                        responseMessage.setResponseMessage("Bad delivery status! Status is not dispatched! It is " + statusList.get(0).getDeliveryStatus());
                        responseMessage.setResponseType(0);
                        return responseMessage;
                    }
                    final Date date = new Date();
                    StatusDelivery status = new StatusDelivery(DeliveryStatus.delivered, date.toInstant().toString());
                    statusList.add(0, status);
                    delivery.setStatusHistory(statusList);
                    deliveryServiceClient.updateDelivery(fixedCookie, delivery, delivery.getId());
                    responseMessage.setResponseMessage("Changed from dispatched to delivered!");
                    responseMessage.setResponseType(1);
                }
            }
            if (!deliveryAssignedToDeliverer){
                responseMessage.setResponseMessage("The box is not assigned to the deliverer");
                responseMessage.setResponseType(0);
            }
        }else if (userDto.getRole().equalsIgnoreCase("customer")) {
            List<DeliveryClientDto> deliveryDtoList = deliveryServiceClient.getAllDeliveriesByCustomerId(fixedCookie, userId).getBody();
            boolean deliveryAssignedToCustomer = false;
            for (DeliveryClientDto delivery : deliveryDtoList){
                if(delivery.getBox().getId().equals(boxId)){
                    deliveryAssignedToCustomer = true;
                    ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();
                    if (statusList.get(0).getDeliveryStatus() != DeliveryStatus.delivered) {
                        responseMessage.setResponseMessage("Bad delivery status!Status is not delivered! it is " + statusList.get(0).getDeliveryStatus());
                        responseMessage.setResponseType(0);
                        return responseMessage;
                    }
                    final Date date = new Date();
                    StatusDelivery status = new StatusDelivery(DeliveryStatus.collected, date.toInstant().toString());
                    statusList.add(0, status);
                    delivery.setStatusHistory(statusList);
                    deliveryServiceClient.updateDelivery(fixedCookie, delivery, delivery.getId());
                    responseMessage.setResponseMessage("changed from delivered to collected");
                    responseMessage.setResponseType(1);
                }
            }
            if (deliveryAssignedToCustomer == false){
                responseMessage.setResponseMessage("THe box is not assigned to the customer");
                responseMessage.setResponseType(0);
            }
        }else if (userDto.getRole().equalsIgnoreCase("dispatcher")){
            responseMessage.setResponseMessage("UserId belongs to a dispatcher! ");
            responseMessage.setResponseType(0);
            return responseMessage;
        }else {
            responseMessage.setResponseMessage("UserId belongs to no one! user Role is : " +userDto.getRole());
            responseMessage.setResponseType(0);
            return responseMessage;
        }
        List<DeliveryClientDto> deliveryOnBoxDtoList = deliveryServiceClient.getAllDeliveriesByBoxId(fixedCookie,boxId).getBody();
        changeBoxStatusOnCondition(deliveryOnBoxDtoList, boxId, boxDto);
        return responseMessage;
    }

    private void changeBoxStatusOnCondition(List<DeliveryClientDto> deliveryList, String boxId, BoxDto boxDto){
        boolean ifBoxFree = true;
        for(DeliveryClientDto delivery: deliveryList){
            ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();
            if (!(statusList.get(0).getDeliveryStatus().equals(DeliveryStatus.collected)) ) {
                ifBoxFree = false;
                break;
            }
        }

        if((boxDto.getStatus().equals(BoxStatus.active) || boxDto.getStatus().equals(BoxStatus.assigned))  && ifBoxFree){
            boxDto.setStatus(BoxStatus.free);
            updateBox(boxDto, boxId);
        }else if (boxDto.getStatus().equals(BoxStatus.free) && !ifBoxFree){
            boxDto.setStatus(BoxStatus.active);
            updateBox(boxDto, boxId);
        }
    }
}
