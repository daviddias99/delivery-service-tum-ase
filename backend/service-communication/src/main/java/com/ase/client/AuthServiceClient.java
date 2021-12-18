package com.ase.client;


import com.ase.client.com.ase.contract.EmailDto;
import com.ase.client.com.ase.contract.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient("auth-service")
public interface AuthServiceClient {

    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public ResponseEntity<UserDto> register(@RequestHeader("Authorization") String authorizationToken, @RequestBody UserDto userDto);
}
