package com.ase.deliveryservice.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Autowired
    private KeyStoreManager keyStoreManager;

    public String generateToken(UserDetails user){
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", user.getAuthorities());
        return createToken(claims, user.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject){
        return Jwts.builder()
        .setClaims(claims)
        .setSubject(subject)
        .setIssuer("aseDelivery")
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5))
        .signWith(keyStoreManager.getPrivateKey(), SignatureAlgorithm.RS256)
        .compact();
    }
    private JwtParser loadJwtParser(){
        return Jwts.parserBuilder()
                .setSigningKey(keyStoreManager.getPublicKey())
                .build();
    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public String extractUserRoles(String token){
        Claims claims = extractAllClaims(token);
        return claims.get("roles").toString();
    }

    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return loadJwtParser()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public boolean verifyJwtSignature(String token){
        try {
            return (loadJwtParser().isSigned(token) && !isTokenExpired(token));
        }
        catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }
}