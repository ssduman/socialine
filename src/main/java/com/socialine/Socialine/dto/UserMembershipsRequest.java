package com.socialine.Socialine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMembershipsRequest {
    public int user;
    public int club;
    public int subClub;
    public int isAdmin;
    public int userPointToSubClub;
    public String review;
    public int isBanned;
    public LocalDate banDate;
    public int banDuration;
    public String banReason;
}
