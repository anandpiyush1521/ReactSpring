package com.application.server.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
    @Id
    private String id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String repeat_password;

    private String first_name;
    private String last_name;
    private String phone;
    private String address;

    private String otp;
    private boolean isEmailVerified;
    private LocalDateTime localDateTime;

}