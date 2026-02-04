package com.cots.service;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.util.UUID;

@Service
public class JwtTokenService {
    private final JwtEncoder jwtEncoder;
    private final long accessExpiration;
    private final long refreshExpiration;
    public JwtTokenService(@Value("${jwt.secret}") String secret,
                           @Value("${jwt.access-expiration}") long accessExpiration,
                           @Value("${jwt.refresh-expiration}") long refreshExpiration) {
        SecretKey key = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        this.jwtEncoder = new NimbusJwtEncoder(
                new ImmutableSecret<>(key)
        );
        this.accessExpiration = accessExpiration;
        this.refreshExpiration = refreshExpiration;
    }
    public String generateAccessToken(String subject) {
        return generateToken(subject, accessExpiration, "access");
    }

    public String generateRefreshToken(String subject) {
        return generateToken(subject, refreshExpiration, "refresh");
    }

    private String generateToken(String subject, long expiration, String type) {
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("cots")
                .subject(subject)
                .issuedAt(now)
                .expiresAt(now.plusMillis(expiration))
                .claim("type", type)
                .claim("jti", UUID.randomUUID().toString())
                .claim("aud", "web-client")
                .build();

        return jwtEncoder
                .encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
    }
}
