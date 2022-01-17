package com.ase.deliveryservice.entity;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class Box {

    @Field("id")
    private String id;

    private String name;
}
