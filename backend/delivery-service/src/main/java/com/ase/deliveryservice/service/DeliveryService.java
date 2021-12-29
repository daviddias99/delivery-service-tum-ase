package com.ase.deliveryservice.service;

import com.ase.client.com.ase.contract.EmailDto;
import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.deliveryservice.entity.DeliveryStatus;

import java.util.List;

public interface DeliveryService {

    DeliveryDto save(DeliveryDto user);

    String createTrackingId();

    public DeliveryDto getById(String id);

    public DeliveryDto getByTrackingNumber(String TrackingNumber);

    public ResponseMessage deleteDelivery(String id);

    DeliveryDto updateDelivery(DeliveryDto deliveryDto, String id);

    public List<DeliveryDto> getAll();


    public List<DeliveryDto> getAllByDelivererId(String delivererId);


    public List<DeliveryDto> getByCustomerId(String id);

    public List<DeliveryDto> getByBoxId(String id);

    public EmailDto prepareSendEmail(DeliveryDto deliveryDto);

    public ResponseMessage dispatch(String id);
}


