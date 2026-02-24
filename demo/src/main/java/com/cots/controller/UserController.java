package com.cots.controller;

import com.cots.service.implement.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController extends AbstractController{
    private final UserService userService;
    @GetMapping("/me")
    public ResponseEntity<?> fetchMe(@AuthenticationPrincipal Jwt jwt){
        String email = jwt.getSubject();

        var userProfile = userService.getUserProfile(email);

        return ok(userProfile);
    }
}
