package com.ase.authservice.service;

import com.ase.authservice.dto.AuthDto;
import com.ase.client.com.ase.contract.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthService extends UserDetailsService {

    UserDto register(AuthDto user);

    public ResponseEntity<AuthResponse> authenticateUser(String authorization,
                                                   HttpServletRequest request, HttpServletResponse response) throws Exception;

    public void setAuthenticationToken(Authentication auth);

    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) throws Exception;

}
