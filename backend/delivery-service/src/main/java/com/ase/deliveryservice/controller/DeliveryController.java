package com.ase.deliveryservice.controller;


import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.client.com.ase.contract.UserDto;
import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.deliveryservice.service.DeliveryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @Autowired
    private ResponseMessage responseMessage;


    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<ResponseMessage> addDelivery(@RequestBody DeliveryDto deliveryDto){

        log.warn("add method is up");

        responseMessage = deliveryService.save(deliveryDto);

        if(responseMessage.getResponseType()==0){
            return ResponseEntity.badRequest().body(responseMessage);
        }

        return ResponseEntity.ok(responseMessage);


    }


    @RequestMapping(value = "/{deliveryId}", method = RequestMethod.GET)
    public ResponseEntity<DeliveryDto> getOne(@PathVariable String deliveryId) {
        return ResponseEntity.ok(deliveryService.getById(deliveryId));
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseMessage> deletebyId (@PathVariable String id) {

        responseMessage = deliveryService.deleteDelivery(id);

        if(responseMessage.getResponseType()==0){
            return ResponseEntity.badRequest().body(responseMessage);
        }

        return ResponseEntity.ok(responseMessage);


    }


    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<List<DeliveryDto>> listDelivery() {
        List<DeliveryDto> data = deliveryService.getAll();
        return ResponseEntity.ok(data);
    }



    @RequestMapping(value = "/list/{delivererId}", method = RequestMethod.GET)
    public ResponseEntity<List<DeliveryDto>> getAllDeliveriesByDelivererId(@PathVariable String delivererId) {
        List<DeliveryDto> data = deliveryService.getAllByDelivererId(delivererId);
        return ResponseEntity.ok(data);
    }



    @RequestMapping(value = "track/{trackingNumber}", method = RequestMethod.GET)
    public ResponseEntity<DeliveryDto> getByTrackingId(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(deliveryService.getByTrackingNumber(trackingNumber));
    }








}
