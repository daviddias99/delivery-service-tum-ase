package com.ase.client;


import com.ase.client.com.ase.contract.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient("account-service")
public interface AccountServiceClient {

    @RequestMapping(value = "/user/{username}")
    public ResponseEntity<UserDto> getOne(@PathVariable String username);

}
