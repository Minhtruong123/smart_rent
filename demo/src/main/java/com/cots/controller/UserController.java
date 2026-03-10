package com.cots.controller;

import com.cots.dto.request.ChangePasswordRequest;
import com.cots.service.implement.PropertyService;
import com.cots.service.implement.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController extends AbstractController{
    private final UserService userService;
    private final PropertyService propertyService;
    @GetMapping("/me")
    public ResponseEntity<?> fetchMe(@AuthenticationPrincipal Jwt jwt){
        String email = jwt.getSubject();

        var userProfile = userService.getUserProfile(email);

        return ok(userProfile);
    }
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request, Principal principal){
        // principal.getName() sẽ trả về email của user lấy từ JWT token
        userService.changePassword(principal.getName(), request);
        return ok("Đổi mật khẩu thành công");
    }
    @GetMapping("/property/owner/{id}")
    public ResponseEntity<?> getPropertyOwner(@PathVariable Long id){
        var ownerInfo = propertyService.getOwnerByPropertyId(id);
        return ok(ownerInfo);
    }
}
