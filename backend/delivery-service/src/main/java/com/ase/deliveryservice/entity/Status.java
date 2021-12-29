package com.ase.deliveryservice.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Status {

    private DeliveryStatus deliveryStatus;

    private String statusUpdate; //timestamp
}
