package com.ase.authservice.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Document(collection = "users")
public class User {

    @MongoId(value = FieldType.OBJECT_ID)
    private String id;


    @Field("password")
    private String password;

    @Field("firstName")
    private String firstName;

    @Field("surname")
    private String surname;

    //@Indexed(unique = true)
    @Field(name = "email")
    @Indexed(unique = true)
    private String email;

    @Field("role")
    private String role;
}
