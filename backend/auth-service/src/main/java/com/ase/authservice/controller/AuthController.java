package com.ase.authservice.controller;

import com.ase.authservice.dto.UserDto;

import com.ase.authservice.service.AuthService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping
    public ResponseEntity<String> login(@RequestHeader("Authorization") String authorization, HttpServletRequest request) throws Exception {
        log.warn("Auth API id on. request:",request.getUserPrincipal());
        return authService.authenticateUser(authorization, request);
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        log.warn("Auth API: Register request is on");
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
