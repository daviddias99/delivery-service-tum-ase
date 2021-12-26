package com.ase.client.com.ase.contract;

import lombok.Data;

@Data
public class EmailDto {

    private String header;

    private String content;

    private String receiver; //email


}
