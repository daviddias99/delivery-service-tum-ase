package com.ase.authservice.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "users")
public class User {

    @Id
    @Field("id")
    private String id;

    @Field("username")
    @Indexed(unique = true)
    private String username;

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
