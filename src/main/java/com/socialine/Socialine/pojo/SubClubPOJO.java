package com.socialine.Socialine.pojo;

import java.time.LocalDate;

public class SubClubPOJO {
    public int subClubId;
    public String name;
    public int adminId;
    public int creatorId;
    public int parentId;
    public LocalDate creationDate;
    public LocalDate lastActivity;
    public String description;
    public String image;
    public float rating;
    public int reviews;
    public int numberOfUsers;

    public SubClubPOJO(int subClubId, String name, int adminId, int creatorId, int parentId, LocalDate creationDate, LocalDate lastActivity, String description, String image, float rating, int reviews) {
        this.subClubId = subClubId;
        this.name = name;
        this.adminId = adminId;
        this.creatorId = creatorId;
        this.parentId = parentId;
        this.creationDate = creationDate;
        this.lastActivity = lastActivity;
        this.description = description;
        this.image = image;
        this.rating = rating;
        this.reviews = reviews;
    }

    public SubClubPOJO(int subClubId, String name, int adminId, int creatorId, int parentId, LocalDate creationDate, LocalDate lastActivity, String description, String image, float rating, int reviews, int numberOfUsers) {
        this.subClubId = subClubId;
        this.name = name;
        this.adminId = adminId;
        this.creatorId = creatorId;
        this.parentId = parentId;
        this.creationDate = creationDate;
        this.lastActivity = lastActivity;
        this.description = description;
        this.image = image;
        this.rating = rating;
        this.reviews = reviews;
        this.numberOfUsers = numberOfUsers;
    }

    public int getSubClubId() {
        return subClubId;
    }

    public void setSubClubId(int subClubId) {
        this.subClubId = subClubId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getLastActivity() {
        return lastActivity;
    }

    public void setLastActivity(LocalDate lastActivity) {
        this.lastActivity = lastActivity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getReviews() {
        return reviews;
    }

    public void setReviews(int reviews) {
        this.reviews = reviews;
    }

    public int getNumberOfUsers() {
        return numberOfUsers;
    }

    public void setNumberOfUsers(int numberOfUsers) {
        this.numberOfUsers = numberOfUsers;
    }
}
