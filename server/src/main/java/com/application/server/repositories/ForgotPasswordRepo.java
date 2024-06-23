package com.application.server.repositories;

import com.application.server.entities.ForgotPassword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ForgotPasswordRepo extends JpaRepository<ForgotPassword, Integer> {
    Optional<ForgotPassword> findByUser_Email(String email);
}
