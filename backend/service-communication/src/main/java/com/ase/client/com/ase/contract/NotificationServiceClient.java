package com.ase.client.com.ase.contract;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.UnsupportedEncodingException;

@FeignClient("notification-service")
public interface NotificationServiceClient {

    @RequestMapping(value = "/notification/email")
    public ResponseEntity<Boolean> sendEmail(@RequestBody EmailDto emailDto);
}
