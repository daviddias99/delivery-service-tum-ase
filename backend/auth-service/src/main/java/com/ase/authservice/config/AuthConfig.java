package com.ase.authservice.config;


import com.ase.authservice.filter.AuthRequestFilter;
import com.ase.authservice.service.AuthService;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
            // .cors()
            // .and()
            //.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            //.and()
            .authorizeRequests()
                .antMatchers("/auth/testtoken").authenticated()
                .antMatchers("/auth/register").permitAll()
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

    // @Bean
    // CorsConfigurationSource corsConfigurationSource() {
    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", new CorsConfiguration()());
    //     return source;
    // }
}
