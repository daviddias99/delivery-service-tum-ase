package com.ase.userservice.service;

import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.client.com.ase.contract.UserDto;
import com.ase.userservice.dto.RegistrationDto;

import java.util.List;

public interface UserService {

    ResponseMessage save(RegistrationDto user, String role,String cookie);

    UserDto getById(String id);

    UserDto getByIdandCheckRole(String id,String role);

    UserDto getByUsername(String username);

    UserDto getByRfid(String rfId);

    List<UserDto> getAll();



    Boolean deleteUser(String id);


    UserDto updateUser(UserDto user,String id);

    List<UserDto> getAllByRole(String role);
}
