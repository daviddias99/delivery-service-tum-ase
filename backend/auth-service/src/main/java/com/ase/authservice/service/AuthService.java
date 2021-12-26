package com.ase.authservice.service;

import com.ase.authservice.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthService extends UserDetailsService {

    UserDto register(UserDto user);

    public ResponseEntity<String> authenticateUser(String authorization,
                                                   HttpServletRequest request, HttpServletResponse response) throws Exception;

    public void setAuthenticationToken(Authentication auth);
}
