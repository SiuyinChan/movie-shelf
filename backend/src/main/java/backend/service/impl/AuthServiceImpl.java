package backend.service.impl;

import backend.dto.request.LoginRequest;
import backend.dto.request.RegisterRequest;
import backend.dto.response.LoginResponse;
import backend.dto.response.UserResponse;
import backend.entity.User;
import backend.exception.UserAlreadyExistsException;
import backend.exception.UserNotFoundException;
import backend.exception.WrongPasswordException;
import backend.mapper.UserMapper;
import backend.security.JwtProvider;
import backend.service.AuthService;
import backend.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Override
    public User getLoggedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
