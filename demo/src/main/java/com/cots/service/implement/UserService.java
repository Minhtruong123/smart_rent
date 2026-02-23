package com.cots.service.implement;

import com.cots.dto.request.RegisterRequest;
import com.cots.dto.response.UserResponse;
import com.cots.enums.Gender;
import com.cots.enums.Role;
import com.cots.model.User;
import com.cots.repository.UserRepository;
import com.cots.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    public UserResponse getUserProfile(String email) {
        User user = getByEmail(email);

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhone())
                .role(user.getRole().name())
                .build();
    }
    public User getByEmail(String email) {
        return userRepository.findByEmailAndActiveTrue(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .fullName(request.fullName())
                .phone(request.phone())
                .role(Role.TENANT)
                .gender(
                        request.gender() != null ? request.gender() : Gender.OTHER
                )
                .active(true)
                .verified(false)
                .build();

        return userRepository.save(user);
    }

    public void updateLastLogin(User user) {
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
    }
}
