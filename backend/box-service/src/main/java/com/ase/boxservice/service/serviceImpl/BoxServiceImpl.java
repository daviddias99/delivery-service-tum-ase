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
import com.ase.client.com.ase.contract.EmailDto;
import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.client.com.ase.contract.UserDto;
import com.ase.client.entity.DeliveryStatus;
import com.ase.client.entity.StatusDelivery;
import lombok.extern.slf4j.Slf4j;
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
import java.util.stream.Collectors;

@Slf4j
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
    private NotificationServiceClient notificationServiceClient;

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
            List<DeliveryClientDto> filteredDeliveries = deliveryDtoList
                    .stream()
                    .filter(p -> p.getBox().getId().equals(boxId) && p.getStatusHistory().get(0).getDeliveryStatus().equals(DeliveryStatus.dispatched))
                    .collect(Collectors.toList());
            if(filteredDeliveries.size() == 0){
                responseMessage.setResponseMessage("THe box is not assigned to the deliverer");
                responseMessage.setResponseType(0);
                return responseMessage;
            }
            responseMessage.setResponseMessage("Deliverer allowed to open the box");
            responseMessage.setResponseType(1);

        }else if (userDto.getRole().equalsIgnoreCase("customer")) {
            List<DeliveryClientDto> deliveryDtoList = deliveryServiceClient.getAllDeliveriesByCustomerId(fixedCookie, userId).getBody();
            List<DeliveryClientDto> filteredDeliveries = deliveryDtoList
                    .stream()
                    .filter(p -> p.getBox().getId().equals(boxId) && p.getStatusHistory().get(0).getDeliveryStatus().equals(DeliveryStatus.delivered))
                    .collect(Collectors.toList());
            if(filteredDeliveries.size() == 0){
                responseMessage.setResponseMessage("THe box is not assigned to the customer");
                responseMessage.setResponseType(0);
                return responseMessage;
            }
            responseMessage.setResponseMessage("customer allowed to open the box");
            responseMessage.setResponseType(1);
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
            List<DeliveryClientDto> filteredDeliveries = deliveryDtoList
                    .stream()
                    .filter(p -> p.getBox().getId().equals(boxId) && p.getStatusHistory().get(0).getDeliveryStatus().equals(DeliveryStatus.dispatched))
                    .collect(Collectors.toList());
            if(filteredDeliveries.size() == 0){
                responseMessage.setResponseMessage("The box is not assigned to the deliverer");
                responseMessage.setResponseType(0);
                return responseMessage;
            }
            for (DeliveryClientDto delivery : filteredDeliveries){
                if(delivery.getBox().getId().equals(boxId)){
                    ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();
                    final Date date = new Date();
                    StatusDelivery status = new StatusDelivery(DeliveryStatus.delivered, date.toInstant().toString());
                    statusList.add(0, status);
                    delivery.setStatusHistory(statusList);
                    deliveryServiceClient.updateDelivery(fixedCookie, delivery, delivery.getId());
                    responseMessage.setResponseMessage("Changed from dispatched to delivered!");

                    prepareSendEmail(delivery,DeliveryStatus.delivered);

                    responseMessage.setResponseType(1);
                }
            }
        }else if (userDto.getRole().equalsIgnoreCase("customer")) {
            List<DeliveryClientDto> deliveryDtoList = deliveryServiceClient.getAllDeliveriesByCustomerId(fixedCookie, userId).getBody();
            List<DeliveryClientDto> filteredDeliveries = deliveryDtoList
                    .stream()
                    .filter(p -> p.getBox().getId().equals(boxId) && p.getStatusHistory().get(0).getDeliveryStatus().equals(DeliveryStatus.delivered))
                    .collect(Collectors.toList());
            if(filteredDeliveries.size() == 0){
                responseMessage.setResponseMessage("THe box is not assigned to the customer");
                responseMessage.setResponseType(0);
                return responseMessage;
            }
            for (DeliveryClientDto delivery : filteredDeliveries){
                    ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();
                    final Date date = new Date();
                    StatusDelivery status = new StatusDelivery(DeliveryStatus.collected, date.toInstant().toString());
                    statusList.add(0, status);
                    delivery.setStatusHistory(statusList);
                    deliveryServiceClient.updateDelivery(fixedCookie, delivery, delivery.getId());
                    responseMessage.setResponseMessage("Delivery status updated from delivered to collected");

                    prepareSendEmail(delivery,DeliveryStatus.collected);


                    responseMessage.setResponseType(1);
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

    @Override
    public ResponseMessage updateBoxStatus(String boxId) {
        BoxDto boxDto = getById(boxId);
        if(boxDto == null){
            responseMessage.setResponseMessage("Box doesn't exist with box ID: " + boxId);
            responseMessage.setResponseType(0);
            return responseMessage;
        }
        List<DeliveryClientDto> deliveryOnBoxDtoList = deliveryServiceClient.getAllDeliveriesByBoxId(fixedCookie,boxId).getBody();
        changeBoxStatusOnCondition(deliveryOnBoxDtoList, boxId, boxDto);
        responseMessage.setResponseMessage("Box Status update successfully");
        responseMessage.setResponseType(1);
        return responseMessage;
    }

    private void changeBoxStatusOnCondition(List<DeliveryClientDto> deliveryList, String boxId, BoxDto boxDto){
        BoxStatus status = BoxStatus.free;
        for(DeliveryClientDto delivery: deliveryList){
            ArrayList<StatusDelivery> statusList = (ArrayList<StatusDelivery>) delivery.getStatusHistory();
            if (statusList.get(0).getDeliveryStatus().equals(DeliveryStatus.delivered)) {
                status = BoxStatus.active;
                break;
            } else if (statusList.get(0).getDeliveryStatus().equals(DeliveryStatus.ordered) || statusList.get(0).getDeliveryStatus().equals(DeliveryStatus.dispatched)) {
                status = BoxStatus.assigned;
            }
        }
        if(!status.equals(boxDto.getStatus())) {
            boxDto.setStatus(status);
            updateBox(boxDto, boxId);
        }
    }


    @Override
    public EmailDto prepareSendEmail(DeliveryClientDto deliveryDto, DeliveryStatus deliveryStatus) {
        EmailDto emailDto = new EmailDto();
        //SET THE COOKIE!
        UserDto receiver = userServiceClient.getOne(fixedCookie,deliveryDto.getCustomer().getId()).getBody();

        if (receiver == null) {
            log.warn("The user is null. Id is probably wrong!");
            return null;
        }



        String header = "Update about your Delivery Status ";
        String content="<p>Hi," + receiver.getFirstName() + " " +receiver.getSurname();
        if(deliveryStatus.equals(DeliveryStatus.delivered)){
            content +=   "</p>" + "<p>Your delivery is delivered to box. You can pick it up! </p>" + deliveryDto.getTrackingNumber() + "<p>Kind Regards</p>";

        }
        if(deliveryStatus.equals(DeliveryStatus.collected)){
            content +=   "</p>" + "<p>Your delivery is picked up! Thank you for choosing us!  </p>" + deliveryDto.getTrackingNumber() + "<p>Kind Regards</p>";

        }

        emailDto.setReceiver(receiver.getEmail());
        emailDto.setHeader(header);
        emailDto.setContent(content);

        ResponseEntity<Boolean> emailResponse = notificationServiceClient.sendEmail(fixedCookie,emailDto);

        if(emailResponse == null) {
            return null;
        }

        return emailDto;
    }



}
