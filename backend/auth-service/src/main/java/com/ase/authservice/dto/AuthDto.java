package com.ase.authservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthDto {

    private String id;

    private String firstName;

    private String surname;

    private String email;

    private String role;

}
