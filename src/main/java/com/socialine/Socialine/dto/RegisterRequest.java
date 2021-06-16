package com.socialine.Socialine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String realName;
    private String name;
    private String email;
    private String password;
    private int isAdmin;
}
