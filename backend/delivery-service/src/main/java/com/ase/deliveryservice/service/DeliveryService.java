package com.ase.deliveryservice.service;

import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.deliveryservice.dto.DeliveryDto;

import java.util.List;

public interface DeliveryService {

    ResponseMessage save(DeliveryDto user);

    String createTrackingId();

    public DeliveryDto getById(String id);

    public ResponseMessage deleteDelivery(String id);

    public List<DeliveryDto> getAll();

}


