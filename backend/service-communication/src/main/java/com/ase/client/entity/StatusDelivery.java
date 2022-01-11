package com.ase.client.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatusDelivery {
    private DeliveryStatus deliveryStatus;

    private String statusUpdate; //timestamp
}
