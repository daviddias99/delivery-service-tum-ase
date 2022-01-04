package com.ase.notificationservice.service.impl;

import com.ase.client.com.ase.contract.EmailDto;
import com.ase.notificationservice.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private JavaMailSender mailSender;


    @Override
    public Boolean sendEmail(EmailDto emailDto) throws MessagingException, UnsupportedEncodingException {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom("asedeliveryy@gmail.com", "ASE Delivery Support");
            helper.setTo(emailDto.getReceiver());


            helper.setSubject(emailDto.getHeader());

            helper.setText(emailDto.getContent(), true);

            mailSender.send(message);

            return Boolean.TRUE;
        }


    }




