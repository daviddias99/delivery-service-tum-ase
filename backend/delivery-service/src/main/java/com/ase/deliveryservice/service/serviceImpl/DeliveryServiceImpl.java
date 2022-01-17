package com.ase.deliveryservice.service.serviceImpl;

import com.ase.client.UserServiceClient;
import com.ase.client.com.ase.contract.DeliveryClientDto;
import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.client.com.ase.contract.EmailDto;
import com.ase.client.NotificationServiceClient;
import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.client.com.ase.contract.UserDto;
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

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserServiceClient userServiceClient;

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

        // Method call will be activated later:
        // prepareSendEmail(deliveryDto); //prepare and send e-mail

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
    public DeliveryClientDto updateDelivery(DeliveryDto deliveryDto, String id) {

        Delivery delivery = deliveryRepository.findById(new ObjectId(id));

        if (delivery == null) {
            return null;
        }

        delivery = modelMapper.map(deliveryDto, Delivery.class);
        deliveryRepository.save(delivery);



        return modelMapper.map(deliveryDto, DeliveryClientDto.class);
    }

    @Override
    public List<DeliveryDto> getAll() {
        log.warn("Get All is on");
//        UserDto user = userServiceClient.getByUsername(cookie,"erengulummmmmm").getBody();
//        log.warn("GetAll user:"+user.getFirstName());

        List<Delivery> data = deliveryRepository.findAll();
        if (data.isEmpty())
            return new LinkedList<>();
        return Arrays.asList(modelMapper.map(data, DeliveryDto[].class));
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
        UserDto receiver = userServiceClient.getOne(null,deliveryDto.getCustomer().getId()).getBody();

        if (receiver == null) {
            log.warn("The user is null. Id is probably wrong!");
            return null;
        }

        String header = "Information about your delivery ";
        String content = "<p>Hi," + receiver.getFirstName() + receiver.getSurname() +
                "</p>"
                + "<p>We've received your delivery. You can track your delivery with the following tracking-number: </p>"
                + deliveryDto.getTrackingNumber() + "<p>Kind Regards</p>";

        emailDto.setReceiver(receiver.getEmail());
        emailDto.setHeader(header);
        emailDto.setContent(content);

        ResponseEntity<Boolean> emailResponse = notificationServiceClient.sendEmail(emailDto);

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
