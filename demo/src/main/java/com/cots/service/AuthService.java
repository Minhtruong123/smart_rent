package com.cots.service;

import com.cots.dto.request.LoginRequest;
import com.cots.dto.request.RegisterRequest;
import com.cots.model.User;
import com.cots.service.implement.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;
    public String login(LoginRequest request) {
        User user = userService.getByEmail(request.email());

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        userService.updateLastLogin(user);
        return jwtTokenService.generateToken(user.getEmail());
    }

    public void register(RegisterRequest request) {
        userService.createUser(request);
    }
}
