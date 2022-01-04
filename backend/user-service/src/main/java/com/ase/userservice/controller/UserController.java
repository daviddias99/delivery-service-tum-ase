package com.ase.userservice.controller;


import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.userservice.dto.RegistrationDto;
import com.ase.userservice.service.UserService;
import com.ase.client.com.ase.contract.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@Slf4j
// @CrossOrigin(origins = ApiPaths.LOCAL_CLIENT_BASE_PATH, maxAge = 3600)
@RequestMapping("/user")
public class UserController {


    @Autowired
    private UserService userService;

/*
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userdto){
        return ResponseEntity.ok(userService.save(userdto));
    }
*/
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deletebyId (@PathVariable String id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<UserDto> getOne(@PathVariable String id) {
        log.warn("User:getOne method is on. ID:"+id);
        return ResponseEntity.ok(userService.getById(id));
    }



    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<List<UserDto>> listUsers() {
        List<UserDto> data = userService.getAll();
        return ResponseEntity.ok(data);
    }


    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<UserDto> updateProfile(@RequestBody UserDto userDto, @PathVariable String id) {
        UserDto user = userService.updateUser(userDto,id);
        if(user==null)
            return ResponseEntity.badRequest().body(user);
        return ResponseEntity.ok(user);
    }


    @RequestMapping(value = "customer/add", method = RequestMethod.POST)
    public ResponseEntity<ResponseMessage> addCustomer(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody RegistrationDto registrationDto){

        return ResponseEntity.ok(userService.save(registrationDto,"CUSTOMER",cookie));
    }


    @RequestMapping(value = "deliverer/add", method = RequestMethod.POST)
    public ResponseEntity<ResponseMessage> addDeliverer(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody RegistrationDto registrationDto){
        return ResponseEntity.ok(userService.save(registrationDto,"DELIVERER",cookie));
    }


    @RequestMapping(value = "dispatcher/add", method = RequestMethod.POST)
    public ResponseEntity<ResponseMessage> addDispatcher(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody RegistrationDto registrationDto){
        return ResponseEntity.ok(userService.save(registrationDto,"DISPATCHER",cookie));
    }


    @RequestMapping(value = "/dispatcher/all",  method = RequestMethod.GET)
    public ResponseEntity<List<UserDto>> getAllDispatchers(){
        List<UserDto> data = userService.getAllByRole("DISPATCHER");
        return ResponseEntity.ok(data);
    }

    @RequestMapping(value = "/customer/all",  method = RequestMethod.GET)
    public ResponseEntity<List<UserDto>> getAllcustomers(){
        List<UserDto> data = userService.getAllByRole("CUSTOMER");
        return ResponseEntity.ok(data);
    }

    @RequestMapping(value = "/deliverer/all",  method = RequestMethod.GET)
    public ResponseEntity<List<UserDto>> getallDeliverers(){
        List<UserDto> data = userService.getAllByRole("DELIVERER");
        return ResponseEntity.ok(data);
    }


    @RequestMapping(value = "/dispatcher/{id}", method = RequestMethod.GET)
    public ResponseEntity<UserDto> getDispatcher(@PathVariable String id) {
        UserDto userDto = userService.getById(id);
        if(userDto==null)
            return ResponseEntity.badRequest().body(userDto);
        return ResponseEntity.ok(userDto);
    }


    @RequestMapping(value = "/customer/{id}", method = RequestMethod.GET)
    public ResponseEntity<UserDto> getCustomer(@PathVariable String id) {
        UserDto userDto = userService.getById(id);
        if(userDto==null)
            return ResponseEntity.badRequest().body(userDto);
        return ResponseEntity.ok(userDto);
    }


    @RequestMapping(value = "/deliverer/{id}", method = RequestMethod.GET)
    public ResponseEntity<UserDto> getDeliverer(@PathVariable String id) {
        UserDto userDto = userService.getById(id);
        if(userDto==null)
            return ResponseEntity.badRequest().body(userDto);
        return ResponseEntity.ok(userDto);
    }



}
