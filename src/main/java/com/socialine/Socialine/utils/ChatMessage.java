package com.socialine.Socialine.utils;

import java.time.LocalDate;

public class ChatMessage {
    private int senderId;
    private int receiverId;
    private String text;
    private String date;

    public ChatMessage() {
    }

    public ChatMessage(int senderId, int receiverId, String text, String date) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.text = text;
        this.date = date;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "senderId=" + senderId +
                ", receiverId=" + receiverId +
                ", text='" + text + '\'' +
                ", date=" + date +
                '}';
    }
}
