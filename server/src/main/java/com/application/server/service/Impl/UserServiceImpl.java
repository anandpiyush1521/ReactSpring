package com.application.server.service.Impl;

import com.application.server.entities.User;
import com.application.server.helpers.PasswordBcrypt;
import com.application.server.helpers.ResourceNotFoundException;
import com.application.server.repositories.UserRepo;
import com.application.server.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Override
    public User saveUser(User user) {
        String userId = UUID.randomUUID().toString();

        user.setId(userId);

        String hashPassword = PasswordBcrypt.hashPassword(user.getPassword());
        user.setPassword(hashPassword);
        user.setRepeat_password(hashPassword);

        user.setFirst_name(user.getFirst_name());
        user.setLast_name(user.getLast_name());
        user.setPhone(user.getPhone());
        user.setAddress(user.getAddress());

        logger.info("User saved successfully");
        return userRepo.save(user);

    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepo.findById(id);
    }

    @Override
    public Optional<User> updateUser(User user) {
        User user2 = userRepo.findById(user.getId()).orElseThrow(() ->new ResourceNotFoundException("User not found"));
        user2.setEmail(user.getEmail());

        String hashPassword = PasswordBcrypt.hashPassword(user.getPassword());
        user2.setPassword(hashPassword);
        user2.setRepeat_password(hashPassword);
        user2.setFirst_name(user.getFirst_name());
        user2.setLast_name(user.getLast_name());
        user2.setPhone(user.getPhone());
        user2.setAddress(user.getAddress());
        user2.setEmailVerified(user.isEmailVerified());

        //save the updated user
        User save = userRepo.save(user2);

        return Optional.ofNullable(save);
    }

    @Override
    public void deleteUser(String id) {
        User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not Found"));
        userRepo.delete(user);
    }

    @Override
    public boolean isUserExistByEmail(String email) {
        User user = userRepo.findByEmail(email).orElse(null);
        return user!=null ? true : false;
    }

    @Override
    public boolean isUserExistByEmailAndPassword(String email, String password) {
        User user = userRepo.findByEmailAndPassword(email, password).orElse(null);
        return user!=null ? true : false;
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}
