package com.socialine.Socialine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddPostRequest {
    private int userId;
    private int subClubId;
    private String text;
    private String title;
    private int isEvent;
}
