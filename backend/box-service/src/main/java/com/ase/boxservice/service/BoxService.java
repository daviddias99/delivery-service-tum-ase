package com.ase.boxservice.service;


import com.ase.boxservice.dto.BoxDto;
import com.ase.client.com.ase.contract.DeliveryClientDto;
import com.ase.client.com.ase.contract.EmailDto;
import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.client.entity.DeliveryStatus;

import java.util.List;

public interface BoxService {

    BoxDto save(BoxDto box);

    BoxDto getById(String id);


    List<BoxDto> getAll();

    Boolean deleteBox(String id);

    BoxDto updateBox(BoxDto boxDto, String id);

    ResponseMessage checkIfTheRfidIsValidForTheBox( String rfId, String boxId);

    ResponseMessage closeBox( String rfId, String boxId);


    ResponseMessage updateBoxStatus(String boxId);

    EmailDto prepareSendEmail(DeliveryClientDto deliveryDto, DeliveryStatus deliveryStatus);
}
