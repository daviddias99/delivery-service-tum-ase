package com.ase.authservice.service;

import com.ase.authservice.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;

public interface AuthService extends UserDetailsService {

    UserDto register(UserDto user);

    public ResponseEntity<String> authenticateUser(String authorization,
                                                   HttpServletRequest request) throws Exception;

    public void setAuthentication(UserDetails user);
}
