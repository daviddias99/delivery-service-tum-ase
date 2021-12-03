package com.ase.client.com.ase.contract;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class ResponseMessage {

    private int responseType; // 1=> successfull 0=>problem occured
    private String responseMessage;

}
