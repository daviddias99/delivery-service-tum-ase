package com.ase.accountservice.controller;


import com.ase.accountservice.service.UserService;
import com.ase.client.com.ase.contract.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @CrossOrigin(origins = ApiPaths.LOCAL_CLIENT_BASE_PATH, maxAge = 3600)
@RequestMapping("/user")
public class UserController {


    @Autowired
    private UserService userService;


    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userdto){
        return ResponseEntity.ok(userService.save(userdto));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deletebyId (@PathVariable String id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }


    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public ResponseEntity<UserDto> getOne(@PathVariable String username) {
        return ResponseEntity.ok(userService.getByUsername(username));
    }



    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<List<UserDto>> listUsers() {
        List<UserDto> data = userService.getAll();
        return ResponseEntity.ok(data);
    }


    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateProfile(@RequestBody UserDto userDto, @PathVariable String id) {
        String responseMessage = userService.updateUser(userDto,id);
        return ResponseEntity.ok(responseMessage);
    }





}
