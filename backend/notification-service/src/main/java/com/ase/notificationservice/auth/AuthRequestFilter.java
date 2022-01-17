package com.ase.notificationservice.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class AuthRequestFilter extends OncePerRequestFilter {


    @Autowired
    private JwtUtil jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //TODO: fix nullptr issue if no cookies attached
        Cookie[] cookies = request.getCookies();
        if(cookies == null){
            response.sendError(HttpStatus.BAD_REQUEST.value(), "No Cookies Found");
        }
        Cookie cookie = null;

        for (int i = 0; i < cookies.length; i++) {
            if (cookies[i].getName().equals("jwt")) {
                cookie = cookies[i];
            }
        }

        String username = null;
        String jwt = null;

        if (cookie != null) {
            jwt = cookie.getValue();

            if (!jwtUtil.verifyJwtSignature(jwt)) {
                response.sendError(HttpStatus.UNAUTHORIZED.value(), "Token Invalid");
                return;
            }
            username = jwtUtil.extractUsername(jwt);
        }


        if (cookie == null) {
            response.sendError(HttpStatus.BAD_REQUEST.value(), "No JWT Cookie Found");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null ||
                !username.equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal())) {


            String principal = username;
            String roles = jwtUtil.extractUserRoles(jwt);
            String role = roles.split("=")[1];
            role = role.substring(0, role.length()-2);

            //TODO: discuss if this is valid / OK practice, inquire next monday
            PreAuthenticatedAuthenticationToken token = new PreAuthenticatedAuthenticationToken(principal,"[Protected]", makeRole(role));
            SecurityContextHolder.getContext().setAuthentication(token);

            Authentication authContext = SecurityContextHolder.getContext().getAuthentication();
            System.out.println(String.format("Authenticate Token Set:\n"
                            + "Username: %s\n"
                            + "Password: %s\n"
                            + "Authority: %s\n",
                    authContext.getPrincipal(),
                    authContext.getCredentials(),
                    authContext.getAuthorities().toString()));
        }
        filterChain.doFilter(request, response);
    }

    public Collection<? extends GrantedAuthority> makeRole(String role) {
        List<GrantedAuthority> list = new ArrayList<>();

        list.add(new SimpleGrantedAuthority(role));

        return list;
    }
}