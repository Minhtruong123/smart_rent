package com.cots.controller;

import com.cots.dto.request.LoginRequest;
import com.cots.dto.request.LogoutRequest;
import com.cots.dto.request.RegisterRequest;
import com.cots.dto.response.LoginResponse;
import com.cots.dto.response.RefreshTokenResponse;
import com.cots.service.AuthService;
import com.cots.service.implement.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController extends AbstractController{
    private final AuthService authService;
    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        var tokens = authService.login(request);

        var userResponse = userService.getUserProfile(request.email());

        LoginResponse response = LoginResponse.builder()
                .accessToken(tokens.get("accessToken"))
                .refreshToken(tokens.get("refreshToken"))
                .user(userResponse)
                .build();

        return ok(response);
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request){
        authService.register(request);
        return ok("Register successful");
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody String refreshToken){
        String newAccessToken = authService.refreshToken(refreshToken);
        return ok(new RefreshTokenResponse(newAccessToken));
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@Valid @RequestBody LogoutRequest request){
        authService.logout(request.refreshToken());
        return ok("Logout successful");
    }
}
