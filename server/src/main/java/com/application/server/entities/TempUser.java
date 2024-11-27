package com.application.server.entities;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TempUser {

    private String id;
    private String email;
    private String username;
    private String password;
    private String repeat_password;
    private String first_name;
    private String last_name;
    private String phone;
    private String address;
    private String otp;
    private LocalDateTime otpGeneratedTime;
}
