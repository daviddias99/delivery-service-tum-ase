package com.ase.deliveryservice.entity;


import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
public class Box {

    @Field("id")
    private String id;

    private String name;
}
