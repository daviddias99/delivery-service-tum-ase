package com.ase.authservice.controller;

import com.ase.authservice.entity.User;
import com.ase.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Base64;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    public ResponseEntity<String> authenticateUser (String authorization,
                                                    HttpServletRequest request) throws Exception{
        String headerString = request.getHeader("Authorization").substring("Basic".length()).trim();
        String decoded = new String(Base64.getDecoder().decode(headerString));
        String username = decoded.split(":", 2)[0];
        String password = decoded.split(":", 2)[1];

        UserDetails user = authService.loadUserByUsername(username);
        if(user == null){
            throw new BadCredentialsException("1000");
        }
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUsername(), password);
        Authentication auth = authManager.authenticate(token);
        return null;
    }

}
