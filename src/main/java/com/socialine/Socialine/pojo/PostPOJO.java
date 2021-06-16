package com.socialine.Socialine.pojo;

import java.time.LocalDateTime;

public class PostPOJO {
    public Long postId;
    public int authorId;
    public int subClubId;
    public LocalDateTime date;
    public String text;
    public String title;
    public int isEvent;

    public PostPOJO(Long postId, int authorId, int subClubId, LocalDateTime date, String text, String title, int isEvent) {
        this.postId = postId;
        this.authorId = authorId;
        this.subClubId = subClubId;
        this.date = date;
        this.text = text;
        this.title = title;
        this.isEvent = isEvent;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public int getSubClubId() {
        return subClubId;
    }

    public void setSubClubId(int subClubId) {
        this.subClubId = subClubId;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getIsEvent() {
        return isEvent;
    }

    public void setIsEvent(int isEvent) {
        this.isEvent = isEvent;
    }
}
