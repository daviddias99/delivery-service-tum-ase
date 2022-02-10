package com.ase.deliveryservice.controller;

import com.ase.client.com.ase.contract.DeliveryClientDto;
import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.client.com.ase.contract.ResponseMessage;

import com.ase.deliveryservice.dto.DeliveryResponse;
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

    @PostMapping(value = "/add")
    public ResponseEntity<DeliveryResponse> addDelivery(@RequestBody DeliveryDto deliveryDto) {

        log.warn("add method is up");
        DeliveryResponse deliveryResponse = new DeliveryResponse();

        responseMessage = deliveryService.validateCredentials(deliveryDto);
        if (responseMessage.getResponseType()==0){
            deliveryResponse.setDeliveryDto(null);
            deliveryResponse.setResponseMessage(responseMessage.getResponseMessage());
            return ResponseEntity.badRequest().body(deliveryResponse);
        }

        if(deliveryService.updateBoxStatus(deliveryDto) == false){
            log.warn("Box update to assigned failed");
            deliveryResponse.setDeliveryDto(null);
            deliveryResponse.setResponseMessage("Box update to assigned failed");
            return ResponseEntity.badRequest().body(deliveryResponse);
        }

        DeliveryDto deliveryDto1 = deliveryService.save(deliveryDto);
        deliveryResponse.setDeliveryDto(deliveryDto1);
        deliveryResponse.setResponseMessage("Delivery Successfully created!");
        return ResponseEntity.ok(deliveryResponse);

    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<DeliveryClientDto> updateDelivery(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody DeliveryDto deliveryDto, @PathVariable String id) {
        DeliveryClientDto updatedDto = deliveryService.updateDelivery(deliveryDto, id);
        if (updatedDto == null)
            return ResponseEntity.badRequest().body(null);

        return ResponseEntity.ok(updatedDto);
    }

    @GetMapping(value = "/{deliveryId}")
    public ResponseEntity<DeliveryDto> getOne(@PathVariable String deliveryId) {
        log.warn("GetOne controller is on");

        //get user; if null: return bad request handle this in delivery service

        return ResponseEntity.ok(deliveryService.getById(deliveryId));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<ResponseMessage> deletebyId(@PathVariable String id) {

        responseMessage = deliveryService.deleteDelivery(id);

        if (responseMessage.getResponseType() == 0) {
            return ResponseEntity.badRequest().body(responseMessage);
        }

        return ResponseEntity.ok(responseMessage);

    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<DeliveryDto>> listDelivery(@RequestHeader(value = "Cookie", required = true) String cookie) {

        List<DeliveryDto> data = deliveryService.getAll();
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/all/deliverer/{delivererId}")
    public ResponseEntity<List<DeliveryClientDto>> getAllDeliveriesByDelivererId(@RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String delivererId) {
        List<DeliveryClientDto> data = deliveryService.getAllByDelivererId(delivererId);
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/all/box/{boxId}")
    public ResponseEntity<List<DeliveryClientDto>> getAllDeliveriesByBoxId(@RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String boxId) {
        List<DeliveryClientDto> data = deliveryService.getByBoxId(boxId);
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/all/customer/{customerId}")
    public ResponseEntity<List<DeliveryClientDto>> getAllDeliveriesByCustomerId(@RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String customerId) {
        List<DeliveryClientDto> data = deliveryService.getByCustomerId(customerId);
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "track/{trackingNumber}")
    public ResponseEntity<DeliveryDto> getByTrackingId(@PathVariable String trackingNumber) {
        DeliveryDto deliveryDto= deliveryService.getByTrackingNumber(trackingNumber);
        if(deliveryDto==null)
            return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok(deliveryService.getByTrackingNumber(trackingNumber));
    }

    @PostMapping(value = "dispatch/{id}")
    public ResponseEntity<ResponseMessage> updateDeliveryStatus(@PathVariable String id) {

        responseMessage = deliveryService.dispatch(id);

        if (responseMessage.getResponseType() == 0) {
            return ResponseEntity.badRequest().body(responseMessage);
        }

        return ResponseEntity.ok(responseMessage);
    }
}
