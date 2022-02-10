package com.ase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;


@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class AuthConfig {

    @Autowired
    CsrfHeaderFilter filter;

    @Bean
    SecurityWebFilterChain SecurityWebFilterChain(ServerHttpSecurity http) {
        http
                .addFilterBefore(filter, SecurityWebFiltersOrder.CSRF)
                .cors().disable()
                .csrf(csrf -> csrf.csrfTokenRepository(CookieServerCsrfTokenRepository.withHttpOnlyFalse()))
                .httpBasic().disable()
                .authorizeExchange()
                .pathMatchers("/**").permitAll();
        return http.build();
    }


}






