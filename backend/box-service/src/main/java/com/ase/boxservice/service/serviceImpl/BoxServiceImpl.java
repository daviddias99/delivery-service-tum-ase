package com.ase.boxservice.service.serviceImpl;

import com.ase.boxservice.dto.BoxDto;
import com.ase.boxservice.entity.Box;
import com.ase.boxservice.entity.BoxStatus;
import com.ase.boxservice.repository.BoxRepository;
import com.ase.boxservice.service.BoxService;
import com.ase.client.DeliveryServiceClient;
import com.ase.client.NotificationServiceClient;
import com.ase.client.UserServiceClient;
import com.ase.client.com.ase.contract.DeliveryClientDto;
import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.client.com.ase.contract.UserDto;
import com.ase.client.entity.DeliveryStatus;
import com.ase.client.entity.StatusDelivery;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
@Slf4j
@Service
public class BoxServiceImpl implements BoxService {
    @Autowired
    private BoxRepository boxRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private NotificationServiceClient notificationServiceClient;

    @Autowired
    private DeliveryServiceClient deliveryServiceClient;

    @Autowired
    ResponseMessage responseMessage;

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
        if(boxRepository.existsById(objectId).booleanValue()){
            Box dbBox = boxRepository.findById(objectId);
            dbBox.setStatus(BoxStatus.inactive);
            boxRepository.save(dbBox);
            return true;
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
        boxRepository.save(dbBox);

        return boxDto;
    }

    @Override
    public ResponseMessage checkBox(String cookie, String userId, String boxId) {
        UserDto userDto = userServiceClient.getOne(cookie, userId).getBody();
        BoxDto boxDto = getById(boxId);
        if(boxDto.getStatus() == BoxStatus.inactive){
            responseMessage.setResponseMessage("Box is inactive!");
            responseMessage.setResponseType(0);
            return responseMessage;
        }
        List<DeliveryClientDto> deliveryOnBoxDtoList = deliveryServiceClient.getAllDeliveriesByBoxId(cookie,boxId).getBody();
        if(userDto.getRole().equals("deliverer")){
            List<DeliveryClientDto> deliveryDtoList = deliveryServiceClient.getAllDeliveriesByDelivererId(cookie,userId).getBody();
            boolean deliveryAssignedToDeliverer = false;
            for (DeliveryClientDto delivery : deliveryDtoList){
                if(delivery.getBox().getId().equals(boxId)){
                    deliveryAssignedToDeliverer = true;
                    ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();

                    if (statusList.get(0).getDeliveryStatus() != DeliveryStatus.dispatched) {
                        responseMessage.setResponseMessage("Bad delivery status! Status is not dispatched! It is " + statusList.get(statusList.size() - 1).getDeliveryStatus());
                        responseMessage.setResponseType(0);
                        return responseMessage;
                    }
                    final Date date = new Date();
                    StatusDelivery status = new StatusDelivery(DeliveryStatus.delivered, date.toInstant().toString());
                    statusList.add(0, status);
                    delivery.setStatusHistory(statusList);
                    deliveryServiceClient.updateDelivery(cookie, delivery, delivery.getId());
                    responseMessage.setResponseMessage("Changed from dispatched to delivered!");
                    responseMessage.setResponseType(1);
                }
            }
            if (deliveryAssignedToDeliverer == false){
                responseMessage.setResponseMessage("The box is not assigned to the deliverer");
                responseMessage.setResponseType(0);
            }
        }else if (userDto.getRole().equals("customer")) {
            List<DeliveryClientDto> deliveryDtoList = deliveryServiceClient.getAllDeliveriesByCustomerId(cookie, userId).getBody();
            boolean deliveryAssignedToCustomer = false;
            for (DeliveryClientDto delivery : deliveryDtoList){
                if(delivery.getBox().getId().equals(boxId)){
                    deliveryAssignedToCustomer = true;
                    ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();

                    if (statusList.get(0).getDeliveryStatus() != DeliveryStatus.delivered) {
                        responseMessage.setResponseMessage("Bad delivery status!Status is not delivered! it is " + statusList.get(statusList.size() - 1).getDeliveryStatus());
                        responseMessage.setResponseType(0);
                        return responseMessage;
                    }
                    final Date date = new Date();
                    StatusDelivery status = new StatusDelivery(DeliveryStatus.collected, date.toInstant().toString());
                    statusList.add(0, status);
                    delivery.setStatusHistory(statusList);
                    deliveryServiceClient.updateDelivery(cookie, delivery, delivery.getId());
                    responseMessage.setResponseMessage("changed from delivered to collected");
                    responseMessage.setResponseType(1);
                }
            }
            if (deliveryAssignedToCustomer == false){
                responseMessage.setResponseMessage("THe box is not assigned to the customer");
                responseMessage.setResponseType(0);
            }
        }else if (userDto.getRole().equals("dispatcher")){
            responseMessage.setResponseMessage("UserId belongs to a dispatcher! ");
            responseMessage.setResponseType(0);
        }else {
            responseMessage.setResponseMessage("UserId belongs to no one! user Role is : " +userDto.getRole());
            responseMessage.setResponseType(0);
        }
        changeBoxStatusOnCondition(deliveryOnBoxDtoList, boxId, boxDto);
        log.debug("response message is " + responseMessage);
        return responseMessage;
    }

    private void changeBoxStatusOnCondition(List<DeliveryClientDto> deliveryList, String boxId, BoxDto boxDto){
        boolean ifBoxFree = true;
        for(DeliveryClientDto delivery: deliveryList){
            ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();
            if ((statusList.get(statusList.size() - 1).getDeliveryStatus() == DeliveryStatus.delivered) ) {
                ifBoxFree = false;
                break;
            }
        }
        if(boxDto.getStatus() == BoxStatus.active && ifBoxFree){
            boxDto.setStatus(BoxStatus.free);
            updateBox(boxDto, boxId);
            log.debug("Box status changed to free");
        }else if (boxDto.getStatus() == BoxStatus.free && !ifBoxFree){
            boxDto.setStatus(BoxStatus.active);
            updateBox(boxDto, boxId);
            log.debug("Box status changed to active from free");
        }
    }
}
