package com.ase.deliveryservice.entity;


import lombok.Data;

@Data
public class Status {

    private DeliveryStatus deliveryStatus;

    private String statusUpdate;
}
