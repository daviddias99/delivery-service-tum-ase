package com.ase.authservice.filter;

import com.ase.authservice.entity.User;
import com.ase.authservice.jwt.JwtUtil;
import com.ase.authservice.service.AuthService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //TODO: fix nullptr issue if no cookies attached
        Cookie[] cookies = request.getCookies();

        Cookie cookie = null;

        if (cookies != null) {
            for (int i = 0; i < cookies.length; i++) {
                if (cookies[i].getName().equals("jwt")) {
                    cookie = cookies[i];
                }
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

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null && cookie == null) {
            //TODO: this situation devolves into error500, doesn't send reply
            response.sendError(HttpStatus.BAD_REQUEST.value(), "No JWT Cookie or Basic Auth Info Found");


        } else if (authHeader != null && !authHeader.startsWith("Basic") && cookie == null) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "unsupported auth format!");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {


            String principal = username;
            String roles = jwtUtil.extractUserRoles(jwt);
            String role = roles.split("=")[1];
            role = role.substring(0, role.length() - 2);

            //TODO: discuss if this is valid / OK practice, inquire next monday
            PreAuthenticatedAuthenticationToken token = new PreAuthenticatedAuthenticationToken(principal, "[Protected]", makeRole(role));
            authService.setAuthenticationToken(token);

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
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();

        list.add(new SimpleGrantedAuthority(role));

        return list;
    }

}
