package com.socialine.Socialine.pojo;

import java.time.LocalDate;

public class UserMembershipsPOJO {
    public int membershipId;
    public int user;
    public String userName;
    public String userMail;
    public int club;
    public String clubName;
    public int subClub;
    public String subClubName;
    public String image;
    public String description;
    public int isAdmin;
    public int userPointToSubClub;
    public String review;
    public int isBanned;
    public LocalDate joinDate;

    public UserMembershipsPOJO(int membershipId, int user, String userName, String userMail, int club, String clubName, int subClub, String subClubName, String image, String description, int isAdmin, int userPointToSubClub, String review, int isBanned, LocalDate joinDate) {
        this.membershipId = membershipId;
        this.user = user;
        this.userName = userName;
        this.userMail = userMail;
        this.club = club;
        this.clubName = clubName;
        this.subClub = subClub;
        this.subClubName = subClubName;
        this.image = image;
        this.description = description;
        this.isAdmin = isAdmin;
        this.userPointToSubClub = userPointToSubClub;
        this.review = review;
        this.isBanned = isBanned;
        this.joinDate = joinDate;
    }

    public int getMembershipId() {
        return membershipId;
    }

    public void setMembershipId(int membershipId) {
        this.membershipId = membershipId;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public int getClub() {
        return club;
    }

    public void setClub(int club) {
        this.club = club;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }

    public int getSubClub() {
        return subClub;
    }

    public void setSubClub(int subClub) {
        this.subClub = subClub;
    }

    public String getSubClubName() {
        return subClubName;
    }

    public void setSubClubName(String subClubName) {
        this.subClubName = subClubName;
    }

    public int getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(int isAdmin) {
        this.isAdmin = isAdmin;
    }

    public int getUserPointToSubClub() {
        return userPointToSubClub;
    }

    public void setUserPointToSubClub(int userPointToSubClub) {
        this.userPointToSubClub = userPointToSubClub;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getIsBanned() {
        return isBanned;
    }

    public void setIsBanned(int isBanned) {
        this.isBanned = isBanned;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    @Override
    public String toString() {
        return "UserMembershipsPOJO{" +
                "membershipId=" + membershipId +
                ", user=" + user +
                ", userName='" + userName + '\'' +
                ", club=" + club +
                ", clubName='" + clubName + '\'' +
                ", subClub=" + subClub +
                ", subClubName='" + subClubName + '\'' +
                ", isAdmin=" + isAdmin +
                ", userPointToSubClub=" + userPointToSubClub +
                ", isBanned=" + isBanned +
                ", joinDate=" + joinDate +
                '}';
    }
}
