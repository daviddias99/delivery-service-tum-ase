package com.ase.boxservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoxDto {

    private String id;

    private String status;

    private String address;

    private String delivery;
}
