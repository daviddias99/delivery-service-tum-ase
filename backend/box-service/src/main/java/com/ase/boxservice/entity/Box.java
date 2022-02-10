package com.ase.boxservice.entity;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Document(collection = "boxes")
public class Box {

    @MongoId(value = FieldType.OBJECT_ID)
    private String id;

    @Field("raspberryId")
    private String raspberryId;

    @Field("name")
    private String name;

    @Field("status")
    private BoxStatus status;

    @Field("address")
    private BoxAddress address;

}

