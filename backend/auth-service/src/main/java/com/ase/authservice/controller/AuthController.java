package com.ase.authservice.controller;

import com.ase.authservice.dto.UserDto;

import com.ase.authservice.service.AuthService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping
    public ResponseEntity<String> login(@RequestHeader("Authorization") String authorization, HttpServletRequest request, HttpServletResponse response) throws Exception {
        log.warn("Atuh API id on. request:", request.getUserPrincipal());
        return authService.authenticateUser(authorization, request, response);
    }


    @PostMapping(value = "/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        log.warn("Auth API: Register request is on");
        return ResponseEntity.ok(authService.register(userDto));
    }

    @PostMapping(value = "/test")
    public ResponseEntity<UserDto> testAdd() {
        return ResponseEntity.ok(authService.register(new UserDto("", "test1", "test1", "bob", "bob", "bob@bob.bob", "user")));
    }

    @GetMapping(value = "/testtoken")
    public ResponseEntity<String> checkToken() {
        return ResponseEntity.ok("token valid");
    }

}
