package com.socialine.Socialine.service;

import com.socialine.Socialine.dto.LoginRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;

    public boolean login(LoginRequest loginRequest) {
        return false;
    }
}
