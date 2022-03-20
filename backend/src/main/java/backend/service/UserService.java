package com.backend.backend.service;

import com.backend.backend.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);

    User save(User user);
}
