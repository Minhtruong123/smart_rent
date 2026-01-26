package com.cots.controller;

import com.cots.dto.request.LoginRequest;
import com.cots.dto.request.RegisterRequest;
import com.cots.dto.response.LoginResponse;
import com.cots.model.User;
import com.cots.service.AuthService;
import com.cots.service.JwtTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthController extends AbstractController{
    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ok(new LoginResponse(authService.login(request)));
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request){
        authService.register(request);
        return ok("Register successful");
    }
}
