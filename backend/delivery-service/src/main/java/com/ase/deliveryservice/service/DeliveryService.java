package com.ase.deliveryservice.service;

import com.ase.client.com.ase.contract.DeliveryClientDto;
import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.client.com.ase.contract.EmailDto;
import com.ase.client.com.ase.contract.ResponseMessage;

import java.util.List;

public interface DeliveryService {

    DeliveryDto save(DeliveryDto user);

    String createTrackingId();

    ResponseMessage validateCredentials(DeliveryDto deliveryDto);

    public DeliveryDto getById(String id);

    public DeliveryDto getByTrackingNumber(String TrackingNumber);

    public ResponseMessage deleteDelivery(String id);

    DeliveryDto updateDelivery(DeliveryDto deliveryDto, String id);

    public List<DeliveryDto> getAll();

    public boolean updateBoxStatus(DeliveryDto boxId);


    public List<DeliveryClientDto> getAllByDelivererId(String delivererId);


    public List<DeliveryClientDto> getByCustomerId(String id);

    public List<DeliveryClientDto> getByBoxId(String id);

    public EmailDto prepareSendEmail(DeliveryDto deliveryDto);

    public ResponseMessage dispatch(String id);

    Boolean hasPendingDelivery(String customerId);
}


