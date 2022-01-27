package com.ase.client.com.ase.contract;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String id;

    private String firstName;

    private String surname;

    private String email;

    private String role;

    private String rfId;
}