package com.ase.client.com.ase.contract;

import com.ase.client.entity.BoxDelivery;
import com.ase.client.entity.StatusDelivery;
import com.ase.client.entity.UserDelivery;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryClientDto {

    private String id;

    private UserDelivery customer;

    private UserDelivery deliverer;

    private UserDelivery dispatcher;

    private BoxDelivery box;

    private List<StatusDelivery> statusHistory;

    private String trackingNumber;

    private String description;

}

