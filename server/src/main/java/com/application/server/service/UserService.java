package com.application.server.service;

import com.application.server.entities.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> getUserById(String id);
    Optional<User> updateUser(User user);
    void deleteUser(String id);
    boolean isUserExistByEmail(String email);

    boolean isUserExistByEmailAndPassword(String email, String password);

    Optional<User> getUserByEmail(String email);
    User register(User user);
    void verify(String email, String otp);
    User login(String email, String password);
}
