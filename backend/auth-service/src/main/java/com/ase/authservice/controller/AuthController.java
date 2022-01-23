package com.ase.authservice.controller;

import com.ase.authservice.dto.AuthDto;
import com.ase.authservice.dto.AuthResponse;
import com.ase.authservice.service.AuthService;

import com.ase.client.com.ase.contract.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
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


    @GetMapping
    public ResponseEntity<String> get()throws Exception{
        return ResponseEntity.ok("XRSF-Request");
    }



    @PostMapping
    public ResponseEntity<AuthResponse> login(@RequestHeader("Authorization") String authorization, HttpServletRequest request, HttpServletResponse response) throws Exception {
        log.warn("Atuh API id on. request:", request.getUserPrincipal());
        return authService.authenticateUser(authorization, request, response);
    }


    @PostMapping(value = "/register")
    public ResponseEntity<UserDto> register(@RequestBody AuthDto authDto) {
        log.warn("Auth API: Register request is on");
        return ResponseEntity.ok(authService.register(authDto));
    }

    @PostMapping(value = "/test")
    public ResponseEntity<UserDto> testAdd() {
        return ResponseEntity.ok(authService.register(new AuthDto("", "test1", "test1", "bob", "bob", "bob@bob.bob", "user")));
    }

    @GetMapping(value = "/testtoken")
    public ResponseEntity<String> checkToken() {
        return ResponseEntity.ok("token valid");
    }

    @PostMapping(value = "/logout")
    public  ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response){
        try {
            return authService.logout(request, response);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("bad token!", HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping(value = "/testpermitall")
    public ResponseEntity<String> permitAll() {
        return ResponseEntity.ok("connection OK");
    }
}
