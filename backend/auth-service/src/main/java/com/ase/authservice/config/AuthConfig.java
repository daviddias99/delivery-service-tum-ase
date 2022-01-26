package com.ase.authservice.config;


import com.ase.authservice.filter.AuthRequestFilter;
import com.ase.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
@Order(1)
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AuthConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    AuthService authService;

    @Autowired
    AuthRequestFilter authRequestFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception{
    http
            //TODO: Enable CSRF
            .csrf()
            .disable()
            .authorizeRequests()
                .antMatchers("/auth/testtoken").authenticated()
                .antMatchers("/auth/register").permitAll()
                .antMatchers("/auth/permitAllTest").permitAll()
                .antMatchers("/auth/logout").authenticated()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/**").authenticated()

                .and()

            .sessionManagement()
            .disable();
    http.addFilterBefore(authRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(AuthenticationManagerBuilder builder) throws Exception{
        builder.userDetailsService(authService);
    }


    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
