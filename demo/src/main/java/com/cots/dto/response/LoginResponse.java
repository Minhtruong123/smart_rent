package com.cots.dto.response;

import lombok.Builder;

@Builder
public record LoginResponse (
        String accessToken,
        String refreshToken,
        UserResponse user
){}
