package com.ase;

import org.springframework.security.web.server.csrf.CsrfToken;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

// found on github: https://github.com/spring-projects/spring-security/issues/6046


@Component
public class CsrfHeaderFilter implements WebFilter {

    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        Mono<CsrfToken> token = (Mono<CsrfToken>) exchange.getAttributes().get(CsrfToken.class.getName());
        if (token != null) {
            return token.flatMap(t -> chain.filter(exchange));
        }
        return chain.filter(exchange);
    }
}
