package com.ase.authservice.filter;

import com.ase.authservice.entity.User;
import com.ase.authservice.jwt.JwtUtil;
import com.ase.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthRequestFilter extends OncePerRequestFilter {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String username = null;
        String jwt = null;

        final String authHeader = request.getHeader("Authorization");

        if(authHeader != null && authHeader.startsWith("Bearer")){

            jwt = authHeader.substring("Bearer".length()).trim();

            if(!jwtUtil.verifyJwtSignature(jwt)){
                response.sendError(HttpStatus.UNAUTHORIZED.value(), "Token Invalid");
            }

            username = jwtUtil.extractUsername(jwt);
        }
        else{
            if(!authHeader.startsWith("Basic")){
                response.sendError(HttpStatus.BAD_REQUEST.value(), "No JWT Token or Basic Auth Info Found");
            }
        }
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails user = authService.loadUserByUsername(username);
            Authentication authContext = SecurityContextHolder.getContext().getAuthentication();
        }
        filterChain.doFilter(request, response);
    }
}
