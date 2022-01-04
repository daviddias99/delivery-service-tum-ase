package com.ase.notificationservice.service;

import com.ase.client.com.ase.contract.EmailDto;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface NotificationService {
    Boolean sendEmail(EmailDto newEmail) throws MessagingException, UnsupportedEncodingException;
}
