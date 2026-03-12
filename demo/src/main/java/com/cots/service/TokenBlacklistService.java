package com.cots.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class TokenBlacklistService {
    private final StringRedisTemplate redisTemplate;

    public void addToBlacklist(String token, long expirationTimeInMillis) {
        redisTemplate.opsForValue().set(
                "BL_" + token,
                "revoked",
                Duration.ofMillis(expirationTimeInMillis)
        );
    }

    public boolean isBlacklisted(String token) {
        return Boolean.TRUE.equals(redisTemplate.hasKey("BL_" + token));
    }
}
