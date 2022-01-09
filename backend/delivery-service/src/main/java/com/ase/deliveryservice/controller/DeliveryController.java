package com.ase.deliveryservice.controller;

import com.ase.client.com.ase.contract.ResponseMessage;
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

    @PostMapping(value = "/add")
    public ResponseEntity<DeliveryDto> addDelivery(@RequestBody DeliveryDto deliveryDto) {

        log.warn("add method is up");

        DeliveryDto deliveryDto1 = deliveryService.save(deliveryDto);

        return ResponseEntity.ok(deliveryDto1);

    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<DeliveryDto> updateDelivery(@RequestBody DeliveryDto deliveryDto, @PathVariable String id) {
        DeliveryDto updatedDto = deliveryService.updateDelivery(deliveryDto, id);
        if (updatedDto == null)
            return ResponseEntity.badRequest().body(null);

        return ResponseEntity.ok(updatedDto);
    }

    @GetMapping(value = "/{deliveryId}")
    public ResponseEntity<DeliveryDto> getOne(@PathVariable String deliveryId) {
        log.warn("GetOne controller is on");

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
    public ResponseEntity<List<DeliveryDto>> listDelivery() {

        List<DeliveryDto> data = deliveryService.getAll();
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/all/deliverer/{delivererId}")
    public ResponseEntity<List<DeliveryDto>> getAllDeliveriesByDelivererId(@PathVariable String delivererId) {
        List<DeliveryDto> data = deliveryService.getAllByDelivererId(delivererId);
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/all/box/{boxId}")
    public ResponseEntity<List<DeliveryDto>> getAllDeliveriesByBoxId(@PathVariable String boxId) {
        List<DeliveryDto> data = deliveryService.getByBoxId(boxId);
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/all/customer/{customerId}")
    public ResponseEntity<List<DeliveryDto>> getAllDeliveriesByCustomerId(@PathVariable String customerId) {
        List<DeliveryDto> data = deliveryService.getByCustomerId(customerId);
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "track/{trackingNumber}")
    public ResponseEntity<DeliveryDto> getByTrackingId(@PathVariable String trackingNumber) {
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
