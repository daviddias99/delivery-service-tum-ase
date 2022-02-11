package com.ase.deliveryservice.service.serviceImpl;

import com.ase.client.BoxServiceClient;
import com.ase.client.UserServiceClient;
import com.ase.client.com.ase.contract.*;
import com.ase.client.entity.BoxStatus;
import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.client.NotificationServiceClient;
import com.ase.deliveryservice.entity.Delivery;
import com.ase.client.entity.DeliveryStatus;
import com.ase.deliveryservice.entity.Status;
import com.ase.deliveryservice.repository.DeliveryRepository;
import com.ase.deliveryservice.service.DeliveryService;
import lombok.extern.slf4j.Slf4j;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Service
public class DeliveryServiceImpl implements DeliveryService {

    Logger LOGGER = LogManager.getLogger(DeliveryServiceImpl.class);

    private final String service_cookie = "jwt=eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6W3sicm9sZSI6IlJPTEVfQk9YIn1dLCJzdWIiOiJCT1giLCJpc3MiOiJhc2VEZWxpdmVyeSIsImlhdCI6MTY0MjAwNTE2OCwiZXhwIjo0MDcyMzUxMjQxfQ.UHdagX4q4DD-3rZd9XoDChRZ926iN0WSqibuXZqI4B3TS5T1PT_Vz1UN_UzpQFxTDWd1Cze7Kj67veeWWA4ZOyHY14At_IHVdcVZqZF2ezxwrKXNKOeHZB7_gFtHqc27uscjf6CbckpCcgnML9r857BMNlOO3kf--Tz1pyYlK-jJzz6sj_sSW1RNln6MZmi6_K59vZryemvFkth4cukKzUkwsNzOu6H2nJtY0Cqhqp5OPKf1QOEKRUgE_aX6EBVf8598aFp3YNoUU9y8HravhiMKV1Y9jDt89sIn_Mf86wpAAnk-zkRAeWdPLvHQRNwRarGWYkBrZb9qZcdCz-AJ1g";


    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private BoxServiceClient boxServiceClient;

    @Autowired
    private ResponseMessage responseMessage;

    @Autowired
    private NotificationServiceClient notificationServiceClient;

    @Override
    public String createTrackingId() {

        ThreadLocalRandom random = ThreadLocalRandom.current();
        String newTrackingId = Long.toString(random.nextLong(10_000_000_000L, 100_000_000_000L));

        if (deliveryRepository.getByTrackingNumber(newTrackingId) != null) {
            log.warn("Tracking number is already in use");
            return createTrackingId();
        }

        return newTrackingId;
    }

    @Override
    public ResponseMessage validateCredentials(DeliveryDto deliveryDto) {

        ResponseMessage respMessage = new ResponseMessage();
        //Normally we can put if statements to the end bring them together by using AND operation.
        // However, since we avoid service calls as much possible, i put conditional statements right after the service call
        log.warn("Customer getOne");
        UserDto customer = userServiceClient.getByIdServiceCall(service_cookie,deliveryDto.getCustomer().getId()).getBody();
        if(customer==null){
            respMessage.setResponseType(0);
            respMessage.setResponseMessage("Customer can't be found");
            return respMessage;
        }
        log.warn("Deliverer getOne");
        UserDto deliverer = userServiceClient.getByIdServiceCall(service_cookie,deliveryDto.getDeliverer().getId()).getBody();
        if(deliverer==null){
            respMessage.setResponseType(0);
            respMessage.setResponseMessage("Deliverer can't be found");
            return respMessage;
        }
        log.warn("Dispatcher getOne");
        UserDto dispatcher = userServiceClient.getByIdServiceCall(service_cookie,deliveryDto.getDispatcher().getId()).getBody();
        if(dispatcher==null){
            respMessage.setResponseType(0);
            respMessage.setResponseMessage("Dispatcher can't be found");
            return respMessage;
        }
        log.warn("BoxDto getById");
        BoxDto boxDto = boxServiceClient.getBoxByIdServiceCall(service_cookie,deliveryDto.getBox().getId()).getBody();
        if(boxDto==null){
            respMessage.setResponseType(0);
            respMessage.setResponseMessage("Box can't be found");
            return respMessage;
        }


        respMessage.setResponseMessage("Successfully validated");
        respMessage.setResponseType(1);
        return respMessage;
    }

    // RETURN STATUS AND MESSAGE INSTEAD OF DTO!!!!
    @Override
    public DeliveryDto save(DeliveryDto deliveryDto) {
        Delivery newDelivery = modelMapper.map(deliveryDto, Delivery.class);

        // check if target box is already in use
        log.warn("delivery save method is on! Deliverer id: ", deliveryDto.getId(), "Deliverer Name ",
                deliveryDto.getDeliverer().getName());

        // create random 11-digit tracking number
        String newTrackingId = createTrackingId();
        newDelivery.setTrackingNumber(newTrackingId);

        Status status = new Status();
        status.setDeliveryStatus(DeliveryStatus.ordered);

        status.setStatusUpdate((new Date()).toInstant().toString());
        newDelivery.setStatusHistory(new ArrayList<>());
        newDelivery.getStatusHistory().add(status);

        newDelivery = deliveryRepository.save(newDelivery);

        deliveryDto.setId(newDelivery.getId());
        deliveryDto.setStatusHistory(newDelivery.getStatusHistory());
        deliveryDto.setTrackingNumber(newDelivery.getTrackingNumber());

        // ethod call will be activated later:
        prepareSendEmail(deliveryDto); //prepare and send e-mail

        return deliveryDto;
    }

    @Override
    public DeliveryDto getById(String id) {
        if (!deliveryRepository.existsById(new ObjectId(id)).booleanValue())
            return null;
        Delivery delivery = deliveryRepository.findById(new ObjectId(id));
        return modelMapper.map(delivery, DeliveryDto.class);
    }

    @Override
    public ResponseMessage deleteDelivery(String id) {
        ObjectId objectId = new ObjectId(id);
        if (deliveryRepository.existsById(objectId).booleanValue()) {
            deliveryRepository.deleteById(objectId);
            responseMessage.setResponseType(1);
            responseMessage.setResponseMessage("Delivery is deleted!");
        } else {
            responseMessage.setResponseType(0);
            responseMessage.setResponseMessage("This delivery isn't present in they system");
        }

        return responseMessage;

    }

    @Override
    public DeliveryDto updateDelivery(DeliveryDto deliveryDto, String id) {

        Delivery delivery = deliveryRepository.findById(new ObjectId(id));
        String initialBoxId = delivery.getBox().getId();
        String finalBoxId = deliveryDto.getBox().getId();
        if (delivery == null) {
            responseMessage.setResponseType(1);
            responseMessage.setResponseMessage("Delivery does not exist!");
        }

        delivery = modelMapper.map(deliveryDto, Delivery.class);

        deliveryRepository.save(delivery);
        boxServiceClient.updateBoxStatus(service_cookie, initialBoxId);
        boxServiceClient.updateBoxStatus(service_cookie, finalBoxId);


        return deliveryDto;
    }

    @Override
    public List<DeliveryDto> getAll() {

        log.warn("Get All is on");
        //UserDto user = userServiceClient.getOne(service_cookie,"61bf5a99b2f2079579480d38").getBody();
       //log.warn("GetAll user:"+user.getFirstName());

        List<Delivery> data = deliveryRepository.findAll();
        if (data.isEmpty())
            return new LinkedList<>();
        return Arrays.asList(modelMapper.map(data, DeliveryDto[].class));
    }

    @Override
    public boolean updateBoxStatus(DeliveryDto deliveryDto) {
        String boxId = deliveryDto.getBox().getId();
        log.warn("DeliveryService:updateBoxStatus is on:"+deliveryDto.getBox().getName());
        BoxDto boxDto = boxServiceClient.getById(service_cookie,boxId).getBody();

        if(boxDto.getStatus().equals(BoxStatus.inactive)){
            log.warn("Box is inactive");
            return false;
        }



        if(boxDto.getStatus().equals(BoxStatus.assigned)){
            List<Delivery> deliveries = deliveryRepository.getAllByBox_Id(boxId);
            for(Delivery delivery:deliveries){
                if (!delivery.getStatusHistory().equals(DeliveryStatus.collected) && !delivery.getCustomer().getId().equals(deliveryDto.getCustomer().getId())){                    log.warn("Box has assigned to other customer's delivery");
                    return false;
                }
            }
        }



        if(boxDto.getStatus().equals(BoxStatus.free)){
            boxDto.setStatus(BoxStatus.assigned);
        }
        BoxDto updatedBox = boxServiceClient.updateBox(service_cookie, boxDto, boxId).getBody();
        if(updatedBox == null){
            return false;
        }
        return true;
    }




    @Override
    public List<DeliveryClientDto> getAllByDelivererId(String delivererId) {
        List<Delivery> deliveries = deliveryRepository.getAllByDeliverer_Id(delivererId);
        if (deliveries.isEmpty())
            return new LinkedList<>();
        return Arrays.asList(modelMapper.map(deliveries, DeliveryClientDto[].class));
    }

    @Override
    public List<DeliveryClientDto> getByCustomerId(String id) {
        List<Delivery> deliveries = deliveryRepository.getAllByCustomer_Id(id);
        if (deliveries.isEmpty())
            return new LinkedList<>();
        return Arrays.asList(modelMapper.map(deliveries, DeliveryClientDto[].class));
    }

    @Override
    public List<DeliveryClientDto> getByBoxId(String id) {
        List<Delivery> deliveries = deliveryRepository.getAllByBox_Id(id);
        if (deliveries.isEmpty())
            return new LinkedList<>();
        return Arrays.asList(modelMapper.map(deliveries, DeliveryClientDto[].class));
    }

    @Override
    public EmailDto prepareSendEmail(DeliveryDto deliveryDto) {
        EmailDto emailDto = new EmailDto();
        //SET THE COOKIE!
        UserDto receiver = userServiceClient.getOne(service_cookie,deliveryDto.getCustomer().getId()).getBody();

        if (receiver == null) {
            log.warn("The user is null. Id is probably wrong!");
            return null;
        }

        String header = "Information about your delivery ";

        String content = "<p>Hi," + receiver.getFirstName() + " " +receiver.getSurname() +
                "</p>"
                + "<p>We've received your delivery. You can track your delivery with the following tracking-number: </p>"
                + deliveryDto.getTrackingNumber() + "<p>Kind Regards</p>";

        emailDto.setReceiver(receiver.getEmail());
        emailDto.setHeader(header);
        emailDto.setContent(content);

        ResponseEntity<Boolean> emailResponse = notificationServiceClient.sendEmail(service_cookie,emailDto);

        if(emailResponse == null) {
            return null;
        }

        return emailDto;
    }

    @Override
    public ResponseMessage dispatch(String id) {
        Delivery delivery = deliveryRepository.findById(new ObjectId(id));

        if (delivery == null) {
            responseMessage.setResponseMessage("Bad delivery ID!");
            responseMessage.setResponseType(0);
            return responseMessage;
        }

        ArrayList<Status> statusList = delivery.getStatusHistory();

        if (statusList.get(statusList.size() - 1).getDeliveryStatus() != DeliveryStatus.ordered) {
            responseMessage.setResponseMessage("Bad delivery status!");
            responseMessage.setResponseType(0);
            return responseMessage;
        }

        final Date date = new Date();

        Status status = new Status(DeliveryStatus.dispatched, date.toInstant().toString());
        statusList.add(0, status);
        LOGGER.info(status.getStatusUpdate());

        delivery.setStatusHistory(statusList);
        deliveryRepository.save(delivery);
        responseMessage.setResponseMessage("Dispatched!");
        responseMessage.setResponseType(1);
        return responseMessage;
    }

    @Override
    public DeliveryDto getByTrackingNumber(String trackingNumber) {
        Delivery delivery = deliveryRepository.getByTrackingNumber(trackingNumber);

        if (delivery == null) {
            return null;
        }
        return modelMapper.map(delivery, DeliveryDto.class);
    }

}
