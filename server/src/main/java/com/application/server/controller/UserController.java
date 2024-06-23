package com.application.server.controller;

import com.application.server.entities.User;
import com.application.server.helpers.PasswordBcrypt;
import com.application.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/api/payerup")
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
        userService.register(user);
        return ResponseEntity.ok("User registered successfully, please verify your email");
    }


    //verify
    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String email, @RequestParam String otp){
        try {
            userService.verify(email, otp);
            return ResponseEntity.ok("User verified successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        try{
            User loggedInUser = userService.login(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(loggedInUser);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
