package com.cots.service;

import com.cots.dto.request.LoginRequest;
import com.cots.dto.request.RegisterRequest;
import com.cots.model.RefreshToken;
import com.cots.model.User;
import com.cots.service.implement.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;
    private final UserService userService;
    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;
    private final JwtDecoder jwtDecoder;
    private final RefreshTokenService refreshTokenService;
    public Map<String, String> login(LoginRequest request) {
        User user = userService.getByEmail(request.email());

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        userService.updateLastLogin(user);
        String accessToken =
                jwtTokenService.generateAccessToken(user.getEmail());

        String refreshToken =
                jwtTokenService.generateRefreshToken(user.getEmail());
        refreshTokenService.create(
                user,
                refreshToken,
                LocalDateTime.now().plusSeconds(refreshExpiration / 1000)
        );

        return Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken
        );
    }

    public void register(RegisterRequest request) {
        userService.createUser(request);
    }
    public String refreshToken(String oldRefreshToken) {
        Jwt jwt = jwtDecoder.decode(oldRefreshToken);

        if (!"refresh".equals(jwt.getClaimAsString("type"))) {
            throw new RuntimeException("Invalid token type");
        }

        RefreshToken storedToken =
                refreshTokenService.validate(oldRefreshToken);

        refreshTokenService.revoke(storedToken);

        User user = storedToken.getUser();

        String newAccessToken =
                jwtTokenService.generateAccessToken(user.getEmail());

        String newRefreshToken =
                jwtTokenService.generateRefreshToken(user.getEmail());

        refreshTokenService.create(
                user,
                newRefreshToken,
                LocalDateTime.now().plusSeconds(refreshExpiration / 1000)
        );

        return newAccessToken;
    }
    public void logout(String refreshToken) {
        RefreshToken token = refreshTokenService.validate(refreshToken);
        refreshTokenService.revoke(token);
    }
}
