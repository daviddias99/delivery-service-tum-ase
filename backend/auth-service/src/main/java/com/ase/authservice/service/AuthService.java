package com.ase.authservice.service;

import com.ase.authservice.dto.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthService extends UserDetailsService {

    ResponseEntity<AuthResponse> authenticateUser(String authorization,
                                                   HttpServletRequest request, HttpServletResponse response) throws Exception;

    void setAuthenticationToken(Authentication auth);

    ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) throws Exception;

}
