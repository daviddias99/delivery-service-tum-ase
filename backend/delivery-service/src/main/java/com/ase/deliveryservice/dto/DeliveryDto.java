package com.ase.deliveryservice.dto;


import com.ase.deliveryservice.entity.Box;
import com.ase.deliveryservice.entity.Status;
import com.ase.deliveryservice.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryDto {

    private String id;

    private User customer;

    private User deliverer;

    private User dispatcher;

    private Box box;

    private List<Status> statusHistory;

    private String trackingNumber;

    private String description;

}
