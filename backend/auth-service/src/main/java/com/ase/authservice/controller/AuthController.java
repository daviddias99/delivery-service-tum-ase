package com.ase.authservice.controller;

import com.ase.authservice.dto.UserDto;

import com.ase.authservice.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping
    public ResponseEntity<String> login(@RequestHeader("Authorization") String authorization, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return authService.authenticateUser(authorization, request, response);
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(authService.register(userDto));
    }

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public ResponseEntity<UserDto> testAdd() {
        return ResponseEntity.ok(authService.register(new UserDto("", "test1", "test1", "bob", "bob", "bob@bob.bob", "user")));
    }

    @RequestMapping(value = "/testtoken", method = RequestMethod.GET)
    public ResponseEntity<String> checkToken() {
        return ResponseEntity.ok("token valid");
    }

}
