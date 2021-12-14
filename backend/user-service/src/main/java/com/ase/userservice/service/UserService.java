package com.ase.userservice.service;

import com.ase.client.com.ase.contract.UserDto;

import java.util.List;

public interface UserService {

    UserDto save(UserDto user);

    UserDto getById(String id);

    List<UserDto> getAll();


    Boolean isEmailExists(String email);

    Boolean deleteUser(String id);


    String updateUser(UserDto user,String id);



}
