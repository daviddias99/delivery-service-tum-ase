package com.ase.deliveryservice.entity;

import com.ase.client.com.ase.contract.UserDto;
import com.google.common.base.Enums;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;


@Data
@Document(collection = "delivery")
public class Delivery {

    @Id
    @Field("id")
    private String id;

    //https://stackoverflow.com/questions/47803934/spring-boot-mongo-how-to-refer-to-document-in-other-collections-from-a-collect
    @Field("receiver")
    private String receiverId;

    @Field("targetBoxId")
    private String targetBoxId;

    @Field(value = "delivererId")
    private String delivererId;


    @Field(value = "status")
    private Status status;

    @Field("trackingId")
    private String trackingId;


}
