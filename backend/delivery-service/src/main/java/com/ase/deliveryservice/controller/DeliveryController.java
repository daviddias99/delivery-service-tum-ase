package com.ase.deliveryservice.controller;


import com.ase.deliveryservice.dto.DeliveryDto;
import com.ase.deliveryservice.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;


    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<DeliveryDto> addDelivery(@RequestBody DeliveryDto deliveryDto){
        return ResponseEntity.ok(deliveryService.save(deliveryDto));
    }

}
