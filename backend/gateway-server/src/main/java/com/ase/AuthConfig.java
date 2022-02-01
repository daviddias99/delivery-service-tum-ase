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
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;


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
                .csrf(csrf -> csrf.csrfTokenRepository(CookieServerCsrfTokenRepository.withHttpOnlyFalse()))
                .httpBasic().disable()
                .authorizeExchange()
                .pathMatchers("/**").permitAll();
        return http.build();
    }

    @Bean
    public WebFluxConfigurer corsConfigurer(){
        return new WebFluxConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/box/check")
                        .allowedOrigins("*");


                registry.addMapping("/**")
                        .allowedOrigins("http://your-frontend-here.com")
                        .allowedMethods("PUT", "GET", "POST", "DELETE")
                        .allowedHeaders("header1", "header2", "header3")
                        .exposedHeaders("header1", "header2")
                        .allowCredentials(true).maxAge(3600);
            }

        };
    }

}






