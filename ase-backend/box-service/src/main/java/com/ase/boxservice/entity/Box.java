package com.ase.boxservice.entity;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "boxes")
public class Box {

    @Id
    @Indexed(unique = true)
    @Field("id")
    private String id;

    @Field("status")
    private String status;

    @Field("address")
    private String address;

    @Field("delivery")
    private String delivery;

}

