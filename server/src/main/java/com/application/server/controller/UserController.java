package com.application.server.controller;

import com.application.server.entities.User;
import com.application.server.helpers.PasswordBcrypt;
import com.application.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/api/users")
@RestController
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        if(userService.isUserExistByEmail(user.getEmail())){
            return ResponseEntity.badRequest().body("User with email already exists");
        }
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        Optional<User> optionalUser = userService.getUserByEmail(user.getEmail());
        if(optionalUser.isPresent()){
            User existingUser = optionalUser.get();
            if(PasswordBcrypt.checkPassword(user.getPassword(), existingUser.getPassword())) {
                return ResponseEntity.ok(existingUser);
            }else{
               return ResponseEntity.badRequest().body("Invalid password");
            }
        }else{
            return ResponseEntity.badRequest().body("User does not exist");
        }
    }
}
