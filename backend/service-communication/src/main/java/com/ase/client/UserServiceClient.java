package com.ase.client;


import com.ase.client.com.ase.contract.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient("user-service")
public interface UserServiceClient {


    @GetMapping(value = "/user/{id}")
    public ResponseEntity<UserDto> getOne(@RequestHeader(value = "Cookie", required = true) String cookie,@PathVariable String id);

    @GetMapping(value = "/user/uname/{username}")
    public ResponseEntity<UserDto> getByUsername(@RequestHeader(value = "Cookie", required = true) String cookie,@PathVariable String username);



}
