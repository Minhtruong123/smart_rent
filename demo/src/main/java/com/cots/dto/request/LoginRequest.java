package com.cots.dto.request;

public record LoginRequest(
        String email,
        String password
) {}
