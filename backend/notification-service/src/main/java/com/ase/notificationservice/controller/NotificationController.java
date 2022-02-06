package com.ase.notificationservice.controller;

import com.ase.client.com.ase.contract.EmailDto;
import com.ase.notificationservice.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/notification")
@Slf4j
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping(value = "/email")
    public ResponseEntity<Boolean> sendEmail(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody EmailDto emailDto) throws MessagingException, UnsupportedEncodingException {

        log.warn("Notification Controller: send e-mail is up");
        Boolean response = notificationService.sendEmail(emailDto);

        if(!response.booleanValue())
            return ResponseEntity.badRequest().body(response);

        return ResponseEntity.ok(response);
    }
}
