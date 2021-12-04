package com.ase.authservice.service;

import com.ase.client.com.ase.contract.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthService extends UserDetailsService {

    UserDto register(UserDto user);

}
