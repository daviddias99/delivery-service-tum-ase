package com.ase.deliveryservice.controller;


import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.client.com.ase.contract.UserDto;
import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.deliveryservice.entity.Delivery;
import com.ase.deliveryservice.entity.DeliveryStatus;
import com.ase.deliveryservice.entity.Status;
import com.ase.deliveryservice.service.DeliveryService;
import feign.Response;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.jni.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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



    @RequestMapping(value = "/all/deliverer/{delivererId}", method = RequestMethod.GET)
    public ResponseEntity<List<DeliveryDto>> getAllDeliveriesByDelivererId(@PathVariable String delivererId) {
        List<DeliveryDto> data = deliveryService.getAllByDelivererId(delivererId);
        return ResponseEntity.ok(data);
    }

    @RequestMapping(value = "/all/box/{boxId}", method = RequestMethod.GET)
    public ResponseEntity<List<DeliveryDto>> getAllDeliveriesByBoxId(@PathVariable String boxId) {
        List<DeliveryDto> data = deliveryService.getByBoxId(boxId);
        return ResponseEntity.ok(data);
    }


    @RequestMapping(value = "/all/customer/{customerId}", method = RequestMethod.GET)
    public ResponseEntity<List<DeliveryDto>> getAllDeliveriesByCustomerId(@PathVariable String customerId) {
        List<DeliveryDto> data = deliveryService.getByCustomerId(customerId);
        return ResponseEntity.ok(data);
    }

    @RequestMapping(value = "track/{trackingNumber}", method = RequestMethod.GET)
    public ResponseEntity<DeliveryDto> getByTrackingId(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(deliveryService.getByTrackingNumber(trackingNumber));
    }

    @RequestMapping(value = "dispatch/{id}", method = RequestMethod.POST)
    public ResponseEntity<ResponseMessage> updateDeliveryStatus(@PathVariable String id){

        responseMessage = deliveryService.dispatch(id);

        if(responseMessage.getResponseType()==0){
            return ResponseEntity.badRequest().body(responseMessage);
        }

        return ResponseEntity.ok(responseMessage);
    }


}
