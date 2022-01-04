package com.ase.client;

import com.ase.client.com.ase.contract.EmailDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@FeignClient("notification-service")
public interface NotificationServiceClient {

    @RequestMapping(value = "/notification/email")
    public ResponseEntity<Boolean> sendEmail(@RequestBody EmailDto emailDto);
}
