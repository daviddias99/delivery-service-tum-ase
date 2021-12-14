package com.ase.deliveryservice.service.serviceImply;


import com.ase.client.UserServiceClient;
import com.ase.client.com.ase.contract.NotificationServiceClient;
import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.deliveryservice.entity.Delivery;
import com.ase.deliveryservice.entity.DeliveryStatus;
import com.ase.deliveryservice.entity.Status;
import com.ase.deliveryservice.repository.DeliveryRepository;
import com.ase.deliveryservice.service.DeliveryService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;


@Slf4j
@Service
public class DeliveryServiceImpl  implements DeliveryService {

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
        String newTrackingId= Long.toString(random.nextLong(10_000_000_000L, 100_000_000_000L));

        if (deliveryRepository.getByTrackingNumber(newTrackingId) !=null){
            log.warn("Tracking number is already in use");
            return createTrackingId();
        }

        return newTrackingId;
    }


    //RETURN STATUS AND MESSAGE INSTEAD OF DTO!!!!
    @Override
    public ResponseMessage save(DeliveryDto deliveryDto) {
        Delivery newDelivery = modelMapper.map(deliveryDto, Delivery.class);

        //check if target box is already in use
        log.warn("delivery save method is on! Deliverer id: ",deliveryDto.getId() ,"Deliverer Name ",deliveryDto.getDeliverer().getName());

        //create random 11-digit tracking number
        String newTrackingId = createTrackingId();
        newDelivery.setTrackingNumber(newTrackingId);

        //newDelivery.setCustomer(deliveryDto.getCustomer());
        Status status = new Status();
        status.setDeliveryStatus(DeliveryStatus.ordered);
        String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());

        status.setStatusUpdate(timeStamp);
        newDelivery.setStatusHistory(new ArrayList<Status>());
        newDelivery.getStatusHistory().add(status);


        newDelivery = deliveryRepository.save(newDelivery);

        deliveryDto.setId(newDelivery.getId());
        deliveryDto.setTrackingNumber(newDelivery.getTrackingNumber());
        responseMessage.setResponseMessage("Delivery is successfully created!");
        //notificationServiceClient.sendEmail()

        responseMessage.setResponseType(1);

        return responseMessage;
    }


    @Override
    public DeliveryDto getById(String id) {
        Delivery delivery = deliveryRepository.getById(id);

        if(delivery.equals(null)){

            return null;
        }
        return modelMapper.map(delivery, DeliveryDto.class);
    }



    @Override
    public ResponseMessage deleteDelivery(String id) {
        if(deliveryRepository.existsById(id)){
            deliveryRepository.deleteById(id);
            responseMessage.setResponseType(1);
            responseMessage.setResponseMessage("Delivery is deleted!");
        }
        else{
            responseMessage.setResponseType(0);
            responseMessage.setResponseMessage("This delivery isn't present in they system");
        }

        return responseMessage;


    }


    @Override
    public List<DeliveryDto> getAll() {
        List<Delivery> data = deliveryRepository.findAll();
        if(data.isEmpty())
            return null;
        return Arrays.asList(modelMapper.map(data, DeliveryDto[].class));
    }

    @Override
    public List<DeliveryDto> getAllByDelivererId(String delivererId) {
        List<Delivery> deliveries = deliveryRepository.getAllByDeliverer_Id(delivererId);
        if(deliveries.isEmpty())
            return null;
        return Arrays.asList(modelMapper.map(deliveries, DeliveryDto[].class));
    }

    @Override
    public List<DeliveryDto> getByCustomerId(String id) {
        List<Delivery> deliveries = deliveryRepository.getAllByCustomer_Id(id);
        if(deliveries.isEmpty())
            return null;
        return Arrays.asList(modelMapper.map(deliveries, DeliveryDto[].class));
    }

    @Override
    public List<DeliveryDto> getByBoxId(String id) {
        List<Delivery> deliveries = deliveryRepository.getAllByBox_Id(id);
        if(deliveries.isEmpty())
            return null;
        return Arrays.asList(modelMapper.map(deliveries, DeliveryDto[].class));
    }


    @Override
    public DeliveryDto getByTrackingNumber(String TrackingNumber) {
        Delivery delivery = deliveryRepository.getByTrackingNumber(TrackingNumber);

        if(delivery.equals(null)){

            return null;
        }
        return modelMapper.map(delivery, DeliveryDto.class);
    }









}
