package com.ase.authservice.config;

import org.springframework.context.annotation.Configuration;

import javax.servlet.http.Cookie;
import java.util.Date;

@Configuration
public class CookieConfig {

    public Cookie createCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        return cookie;
    }

    public void deleteCookie(Cookie cookie){
        cookie.setValue("deleted");
    }

}
