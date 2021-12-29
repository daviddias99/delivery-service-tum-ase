package com.ase.client.com.ase.contract;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage {

    private int responseType; // 1=> successfull 0=>problem occured
    private String responseMessage;

    public ResponseMessage() {

    }
}
