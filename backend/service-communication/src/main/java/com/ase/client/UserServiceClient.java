package com.ase.client;


import com.ase.client.com.ase.contract.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient("user-service")
public interface UserServiceClient {


    @GetMapping(value = "/user/{id}")
    public ResponseEntity<UserDto> getOne(@RequestHeader(value = "Cookie", required = true) String cookie,@PathVariable String id);

    @GetMapping(value = "/user/rfid/{rfId}")
    public ResponseEntity<UserDto> getByRfId(@RequestHeader(value = "Cookie", required = true) String cookie,@PathVariable String rfId);


    @GetMapping(value = "/user/service-call/{id}")
    public ResponseEntity<UserDto> getByIdServiceCall(@RequestHeader(value = "Cookie", required = true) String cookie,@PathVariable String id);



}
