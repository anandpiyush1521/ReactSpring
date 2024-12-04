package com.application.server.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {
    private final String jwt;
    private final String username;
    private final String email;
    private final String first_name;
    private final String address;

    public AuthenticationResponse(String jwt, String username, String email, String first_name, String address) {
        this.jwt = jwt;
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.address = address;
    }
}
