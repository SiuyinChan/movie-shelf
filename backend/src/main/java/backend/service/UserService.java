package backend.service;

import backend.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

    User save(User user);

    User loadUserById(Long id);

    void deleteUserById(Long id);
}
