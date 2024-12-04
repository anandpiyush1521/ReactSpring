package com.application.server.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRespJwt {
    private final String jwt;

    public AuthenticationRespJwt(String jwt) {
        this.jwt = jwt;
    }
}
