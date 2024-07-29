package com.application.server.controller;

import com.application.server.entities.ForgotPassword;
import com.application.server.entities.User;
import com.application.server.helpers.PasswordBcrypt;
import com.application.server.repositories.ForgotPasswordRepo;
import com.application.server.repositories.UserRepo;
import com.application.server.service.Impl.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@RequestMapping("/api/payerup")
@RestController
@CrossOrigin("*")
public class ForgotPasswordController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ForgotPasswordRepo forgotPasswordRepo;
    @Autowired
    private EmailService emailService;

    //forgot password
    @PostMapping("/request-otp")
    public ResponseEntity<String> requestOtp(@RequestBody User user){
        Optional<User> existingUser = userRepo.findByEmail(user.getEmail());
        if(existingUser.isEmpty()){
            return ResponseEntity.badRequest().body("User with email does not exist");
        }
        User userEntity = existingUser.get();
        String otp = generateOtp();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(5);

        ForgotPassword forgotPassword = forgotPasswordRepo.findByUser_Email(user.getEmail())
                .orElse(new ForgotPassword());

        forgotPassword.setOtp(otp);
        forgotPassword.setExpirationTime(expirationTime);
        forgotPassword.setUser(userEntity);
        forgotPasswordRepo.save(forgotPassword);

        emailService.sendEmail(user.getEmail(), "PayerUp: OTP for password reset !!!", "Your OTP is: " + otp);

        return ResponseEntity.ok("OTP sent successfully to Your Email");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody ForgotPassword forgotPasswordRequest) {
        Optional<ForgotPassword> forgotPasswordOptional = forgotPasswordRepo
                .findByUser_Email(forgotPasswordRequest.getUser().getEmail());

        if (forgotPasswordOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid request.");
        }

        ForgotPassword forgotPassword = forgotPasswordOptional.get();

        if (forgotPassword.getUser() == null) {
            return ResponseEntity.badRequest().body("User not associated with OTP request.");
        }

        if (!forgotPassword.getOtp().equals(forgotPasswordRequest.getOtp()) ||
                forgotPassword.getExpirationTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP.");
        }

        User user = forgotPassword.getUser();
        user.setPassword(PasswordBcrypt.hashPassword(forgotPasswordRequest.getUser().getPassword())); // Make sure to hash the password before saving
        userRepo.save(user);
        forgotPasswordRepo.delete(forgotPassword);

        return ResponseEntity.ok("Password reset successfully.");
    }

    private String generateOtp(){
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }
}
