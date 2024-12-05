package com.application.server.dto.response;

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
