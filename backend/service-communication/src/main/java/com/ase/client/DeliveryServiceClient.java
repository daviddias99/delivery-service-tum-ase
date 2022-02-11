package com.ase.client;

import com.ase.client.com.ase.contract.DeliveryClientDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient("delivery-service")
public interface DeliveryServiceClient {
    @GetMapping(value = "/delivery/all/deliverer/{delivererId}")
    public ResponseEntity<List<DeliveryClientDto>> getAllDeliveriesByDelivererId(@RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String delivererId);

    @GetMapping(value = "/delivery/all/box/{boxId}")
    public ResponseEntity<List<DeliveryClientDto>> getAllDeliveriesByBoxId(@RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String boxId);

    @GetMapping(value = "/delivery/all/customer/{customerId}")
    public ResponseEntity<List<DeliveryClientDto>> getAllDeliveriesByCustomerId(@RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String customerId);

    @PutMapping(value = "/delivery/update/{id}")
    public ResponseEntity<DeliveryClientDto> updateDelivery(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody DeliveryClientDto deliveryDto, @PathVariable String id);

    @GetMapping(value="delivery/pending/{id}")
    public ResponseEntity<Boolean> hasPendingDelivery(@RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String id);


}
