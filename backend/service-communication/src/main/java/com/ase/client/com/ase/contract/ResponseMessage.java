package com.ase.client.com.ase.contract;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
public class ResponseMessage {

    private int responseType; // 1=> successfull 0=>problem occured
    private String responseMessage;

    public ResponseMessage() {

    }
}
