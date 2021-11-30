package com.ase.deliveryservice.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Data
@Document(collection = "delivery")
public class Delivery {

    @Id
    @Field("id")
    private String id;

    @Field("receiver")
    private String receiver;

    @Field("sender")
    private String sender;

    @Field("trackingId")
    private String trackingId;


}
