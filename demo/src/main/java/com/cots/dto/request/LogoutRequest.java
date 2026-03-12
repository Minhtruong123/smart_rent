package com.cots.dto.request;

public record LogoutRequest(
        String accessToken,
        String refreshToken
) {}