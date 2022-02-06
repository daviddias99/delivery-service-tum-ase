package com.ase.client;

import com.ase.client.com.ase.contract.EmailDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@FeignClient("notification-service")
public interface NotificationServiceClient {

    @PostMapping(value = "/notification/email")
    public ResponseEntity<Boolean> sendEmail(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody EmailDto emailDto);
}
