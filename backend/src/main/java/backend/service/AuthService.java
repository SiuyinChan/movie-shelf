package backend.service;

import backend.dto.request.LoginRequest;
import backend.dto.request.RegisterRequest;
import backend.dto.response.LoginResponse;
import backend.dto.response.UserResponse;
import backend.entity.User;

public interface AuthService {
    UserResponse register(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);

    User getLoggedUser();
}
