package com.ase.client;

import com.ase.client.com.ase.contract.BoxDto;
import com.ase.client.com.ase.contract.ResponseMessage;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@FeignClient("box-service")
public interface BoxServiceClient {

    @GetMapping(value = "/box/{id}")
    public ResponseEntity<BoxDto> getById (@RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String id);

    @PutMapping(value = "/box/update/{id}")
    public ResponseEntity<BoxDto> updateBox(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody BoxDto boxDto, @PathVariable String id);

    @PostMapping(value = "/box/updateboxstatus")
    public ResponseEntity<ResponseMessage> updateBoxStatus(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody String boxId);


    @GetMapping(value = "/box/service-call/{id}")
    public ResponseEntity<BoxDto> getBoxByIdServiceCall (@RequestHeader(value = "Cookie", required = true) String cookie, @PathVariable String id);

}
