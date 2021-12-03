package com.ase.deliveryservice.dto;


import com.ase.client.com.ase.contract.UserDto;
import com.ase.deliveryservice.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryDto {

    private String id;

    private String receiverId;

    private String delivererId;

    private String targetBoxId;

    private Status status;

    private String trackingId;
}
