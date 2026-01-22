package com.cots.model;

import com.cots.enums.Gender;
import com.cots.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false, unique = true)
    String email;
    @Column(nullable = false)
    String passwordHash;
    String fullName;
    String phone;
    String avatarUrl;
    LocalDateTime dateOfBirth;
    @Enumerated(EnumType.STRING)
    Gender gender;
    String address;
    String ward;
    String district;
    String city;
    @Enumerated(EnumType.STRING)
    Role role;
    Boolean verified = false;
    Boolean active = true;
    LocalDateTime lastLoginAt;
    @CreationTimestamp
    LocalDateTime createdAt;
    @CreationTimestamp
    LocalDateTime updatedAt;
}
