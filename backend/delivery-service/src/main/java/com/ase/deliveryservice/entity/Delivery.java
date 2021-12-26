package com.ase.deliveryservice.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;
import java.util.List;


@Data
@Document(collection = "delivery")
public class Delivery {

    @MongoId(value = FieldType.OBJECT_ID)
    private String id;

    //https://stackoverflow.com/questions/47803934/spring-boot-mongo-how-to-refer-to-document-in-other-collections-from-a-collect
    @Field("customer")
    private User customer;

    @Field(value = "deliverer")
    private User deliverer;

    @Field(value = "dispatcher")
    private User dispatcher;

    @Field("box")
    private Box box;

    @Field("trackingId")
    private String trackingNumber;

    @Field("statusHistory")
    private ArrayList<Status> statusHistory;

    @Field("description")
    private String description;

}
