package com.cots.service;

import com.cots.dto.request.RegisterRequest;
import com.cots.model.User;

public interface IUserService {
    User getByEmail(String email);
    User createUser(RegisterRequest request);
    void updateLastLogin(User user);
}
