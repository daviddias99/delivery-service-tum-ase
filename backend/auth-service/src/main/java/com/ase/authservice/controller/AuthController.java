package com.ase.authservice.controller;

import com.ase.authservice.dto.UserDto;

import com.ase.authservice.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping
    public ResponseEntity<String> login(@RequestHeader("Authorization") String authorization, HttpServletRequest request) throws Exception{
        return authService.authenticateUser(authorization, request);
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<UserDto> register (@RequestBody UserDto userDto){
        return ResponseEntity.ok(authService.register(userDto));
    }
}
