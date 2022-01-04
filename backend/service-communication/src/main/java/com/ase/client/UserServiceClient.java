package com.ase.client;


import com.ase.client.com.ase.contract.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient("user-service")
public interface UserServiceClient {

    @RequestMapping(value = "/user/{id}")
    public ResponseEntity<UserDto> getOne(@PathVariable String id);

}
