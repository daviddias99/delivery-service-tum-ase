package com.ase.client;


import com.ase.client.com.ase.contract.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient("auth-service")
public interface AuthServiceClient {

    @PostMapping(value = "/auth/register")
    public ResponseEntity<UserDto> register(@RequestHeader(value = "Cookie", required = true) String authorizationHeader, @RequestBody UserDto userDto);
}
