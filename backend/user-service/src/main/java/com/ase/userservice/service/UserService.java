package com.ase.userservice.service;

import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.client.com.ase.contract.UserDto;

import java.util.List;

public interface UserService {

    ResponseMessage save(UserDto user, String role);

    UserDto getById(String id);

    List<UserDto> getAll();



    Boolean deleteUser(String id);


    String updateUser(UserDto user,String id);



}
