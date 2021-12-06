package com.ase.authservice.controller;

import com.ase.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
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


    //TODO: delegate to service
    @PostMapping
    public ResponseEntity<String> authenticateUser(@RequestHeader("Authorization") String authorization,
                                                   HttpServletRequest request) throws Exception {

        // decodes request header and splits into username/pw
        String headerString = authorization.substring("Basic".length()).trim();
        String decoded = new String(Base64.getDecoder().decode(headerString));
        String username = decoded.split(":", 2)[0];
        String password = decoded.split(":", 2)[1];

        // get user by given username
        UserDetails user = authService.loadUserByUsername(username);
        if (user == null) {
            throw new BadCredentialsException("1000");
        }

        // authenticate using authManager and token of username and password
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());
        Authentication auth = null;

        try{
            auth = authManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
            //TODO: Jwt token thing
            return ResponseEntity.ok("");
        } catch (BadCredentialsException e){
            e.printStackTrace();
            return new ResponseEntity<>("Email or password is incorrect", HttpStatus.BAD_REQUEST);
        } catch (Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
