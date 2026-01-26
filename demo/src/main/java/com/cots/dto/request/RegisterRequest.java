package com.cots.dto.request;

import com.cots.enums.Gender;

public record RegisterRequest (
        String email,
        String password,
        String fullName,
        String phone,
        Gender gender
){}