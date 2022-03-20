package com.backend.backend.service.impl;

import com.backend.backend.dto.request.LoginRequest;
import com.backend.backend.dto.request.RegisterRequest;
import com.backend.backend.dto.response.LoginResponse;
import com.backend.backend.dto.response.UserResponse;
import com.backend.backend.entity.User;
import com.backend.backend.exception.UserAlreadyExistsException;
import com.backend.backend.exception.UserNotFoundException;
import com.backend.backend.exception.WrongPasswordException;
import com.backend.backend.mapper.UserMapper;
import com.backend.backend.security.JwtProvider;
import com.backend.backend.service.AuthService;
import com.backend.backend.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthServiceImpl(UserService userService, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    private LoginResponse doLogin(User user) {
        String token = jwtProvider.createToken(user);
        return new LoginResponse(token);
    }

    @Override
    public UserResponse register(RegisterRequest registerRequest) {
        Optional<User> existingUser = userService.findByEmail(registerRequest.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException();
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        User persistedUser = userService.save(user);

        return UserMapper.userToResponse(persistedUser);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        return userService.findByEmail(loginRequest.getEmail()).map(user -> {
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return doLogin(user);
            } else {
                throw new WrongPasswordException();
            }
        }).orElseThrow(UserNotFoundException::new);
    }
}
