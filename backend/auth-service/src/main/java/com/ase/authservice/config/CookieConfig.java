package com.ase.authservice.config;

import org.springframework.context.annotation.Configuration;

import javax.servlet.http.Cookie;

@Configuration
public class CookieConfig {

    public Cookie createCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        return cookie;
    }

}
