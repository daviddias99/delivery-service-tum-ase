package com.ase.userservice.controller;


import com.ase.client.com.ase.contract.ResponseMessage;
import com.ase.userservice.dto.RegistrationDto;
import com.ase.userservice.service.UserService;
import com.ase.client.com.ase.contract.UserDto;
import com.ase.userservice.service.serviceImpl.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {


    @Autowired
    private UserService userService;

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Boolean> deletebyId (@PathVariable String id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }


    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDto> getOne(@PathVariable String id) {
        log.warn("User:getOne method is on. ID:"+id);
        System.out.println("reached the get request");
        UserDto user = userService.getById(id);
//        if(user==null)
//            return ResponseEntity.badRequest().body(null);

        return ResponseEntity.ok(user);
    }

    @GetMapping(value = "/uname/{username}")
    public ResponseEntity<UserDto> getByUsername(@RequestHeader(value = "Cookie", required = true) String cookie,@PathVariable String username) {
        log.warn("User:sfsdfsfsd method is on:"+username);

        UserDto user = userService.getByUsername(username);
        if(user==null)
            return ResponseEntity.badRequest().body(null);

        return ResponseEntity.ok(user);
    }



    @GetMapping(value = "/all")
    public ResponseEntity<List<UserDto>> listUsers() {
        List<UserDto> data = userService.getAll();
        return ResponseEntity.ok(data);
    }


    @PutMapping(value = "/update/{id}")
    public ResponseEntity<UserDto> updateProfile(@RequestBody UserDto userDto, @PathVariable String id) {
        UserDto user = userService.updateUser(userDto,id);
        if(user==null)
            return ResponseEntity.badRequest().body(user);
        return ResponseEntity.ok(user);
    }


    @PostMapping(value = "customer/add")
    public ResponseEntity<ResponseMessage> addCustomer(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody RegistrationDto registrationDto){
        String randomRfid = UserServiceImpl.getAlphaNumericString(10);
        registrationDto.setRfId(randomRfid);
        ResponseMessage responseMessage = userService.save(registrationDto,"CUSTOMER",cookie);
        if(responseMessage.getResponseType()==0)
            return ResponseEntity.badRequest().body(responseMessage);

        return ResponseEntity.ok(responseMessage);
    }


    @PostMapping(value = "deliverer/add")
    public ResponseEntity<ResponseMessage> addDeliverer(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody RegistrationDto registrationDto){
        ResponseMessage responseMessage = userService.save(registrationDto,"DELIVERER",cookie);
        if(responseMessage.getResponseType()==0)
            return ResponseEntity.badRequest().body(responseMessage);

        return ResponseEntity.ok(responseMessage);
    }


    @PostMapping(value = "dispatcher/add")
    public ResponseEntity<ResponseMessage> addDispatcher(@RequestHeader(value = "Cookie", required = true) String cookie, @RequestBody RegistrationDto registrationDto){
        ResponseMessage responseMessage = userService.save(registrationDto,"DISPATCHER",cookie);
        if(responseMessage.getResponseType()==0)
            return ResponseEntity.badRequest().body(responseMessage);

        return ResponseEntity.ok(responseMessage);
    }


    @GetMapping(value = "/dispatcher/all")
    public ResponseEntity<List<UserDto>> getAllDispatchers(){
        List<UserDto> data = userService.getAllByRole("DISPATCHER");
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/customer/all")
    public ResponseEntity<List<UserDto>> getAllcustomers(){
        List<UserDto> data = userService.getAllByRole("CUSTOMER");
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/deliverer/all")
    public ResponseEntity<List<UserDto>> getallDeliverers(){
        List<UserDto> data = userService.getAllByRole("DELIVERER");
        return ResponseEntity.ok(data);
    }


    @GetMapping(value = "/dispatcher/{id}")
    public ResponseEntity<UserDto> getDispatcher(@PathVariable String id) {
        UserDto userDto = userService.getByIdandCheckRole(id,"DISPATCHER");
        if(userDto==null)
            return ResponseEntity.badRequest().body(userDto);
        return ResponseEntity.ok(userDto);
    }


    @GetMapping(value = "/customer/{id}")
    public ResponseEntity<UserDto> getCustomer(@PathVariable String id) {
        UserDto userDto = userService.getByIdandCheckRole(id,"CUSTOMER");
        if(userDto==null)
            return ResponseEntity.badRequest().body(userDto);
        return ResponseEntity.ok(userDto);
    }


    @GetMapping(value = "/deliverer/{id}")
    public ResponseEntity<UserDto> getDeliverer(@PathVariable String id) {
        UserDto userDto = userService.getByIdandCheckRole(id,"DELIVERER");
        if(userDto==null)
            return ResponseEntity.badRequest().body(userDto);
        return ResponseEntity.ok(userDto);
    }
}
