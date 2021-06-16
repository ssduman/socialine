package com.socialine.Socialine.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CommentPOJO {

    public Long commentId;
    public int authorId;
    public Long postId;
    public String text;
    public LocalDateTime date;


}
