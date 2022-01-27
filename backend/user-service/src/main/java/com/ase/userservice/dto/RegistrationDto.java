package com.ase.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDto {
    private String id;

    private String firstName;

    private String surname;

    private String password;

    private String email;

    private String rfId="";

}
