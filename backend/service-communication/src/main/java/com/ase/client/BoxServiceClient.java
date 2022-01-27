package com.ase.client;

import com.ase.client.com.ase.contract.BoxDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient("box-service")
public interface BoxServiceClient {

    @GetMapping(value = "/box/{id}")
    public ResponseEntity<BoxDto> getById (@PathVariable String id);

    @PutMapping(value = "/box/update/{id}")
    public ResponseEntity<BoxDto> updateBox(@RequestBody BoxDto boxDto, @PathVariable String id);

}
