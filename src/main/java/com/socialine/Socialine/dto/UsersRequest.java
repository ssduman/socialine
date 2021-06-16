package com.socialine.Socialine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersRequest {
    private int id;
    private String realName;
    private String name;
    private String email;
    private String password;
    private String about;
    private int isAdmin;
}
