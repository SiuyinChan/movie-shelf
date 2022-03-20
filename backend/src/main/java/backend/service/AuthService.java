package com.backend.backend.service;

import com.backend.backend.dto.request.LoginRequest;
import com.backend.backend.dto.request.RegisterRequest;
import com.backend.backend.dto.response.LoginResponse;
import com.backend.backend.dto.response.UserResponse;

public interface AuthService {
    UserResponse register(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);
}
