package com.application.server.entities;

import com.application.server.helpers.UserSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
@JsonSerialize(using = UserSerializer.class)
public class User {
    @Id
    private String id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    private String repeat_password;

    private String first_name;
    private String last_name;
    private String phone;
    private String address;

    private String otp;
    private boolean isEmailVerified;
    private LocalDateTime localDateTime;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private ForgotPassword forgotPassword;

}
