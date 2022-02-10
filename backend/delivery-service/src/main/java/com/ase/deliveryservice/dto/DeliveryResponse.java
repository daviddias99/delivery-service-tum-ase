package com.ase.deliveryservice.dto;

import com.ase.deliveryservice.entity.Delivery;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryResponse {
    DeliveryDto deliveryDto;
    String responseMessage;
}
