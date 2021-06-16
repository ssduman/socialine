package com.socialine.Socialine.pojo;

import java.time.LocalDate;

public class UsersPOJO {
    public String realName;
    public String name;
    public String email;
    public String password;
    public LocalDate regDate;
    public LocalDate lastLogin;
    public LocalDate lastWrongAttempt;
    public int isVerified;
    public int isPassChange;
    public int isAdmin;
    public LocalDate questionnaireAnswered;
    public String about;

    public UsersPOJO(String realName, String name, String email, String password, LocalDate regDate, LocalDate lastLogin, LocalDate lastWrongAttempt, int isVerified, int isPassChange, int isAdmin, LocalDate questionnaireAnswered, String about) {
        this.realName = realName;
        this.name = name;
        this.email = email;
        this.password = password;
        this.regDate = regDate;
        this.lastLogin = lastLogin;
        this.lastWrongAttempt = lastWrongAttempt;
        this.isVerified = isVerified;
        this.isPassChange = isPassChange;
        this.isAdmin = isAdmin;
        this.questionnaireAnswered = questionnaireAnswered;
        this.about = about;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getRegDate() {
        return regDate;
    }

    public void setRegDate(LocalDate regDate) {
        this.regDate = regDate;
    }

    public LocalDate getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDate lastLogin) {
        this.lastLogin = lastLogin;
    }

    public LocalDate getLastWrongAttempt() {
        return lastWrongAttempt;
    }

    public void setLastWrongAttempt(LocalDate lastWrongAttempt) {
        this.lastWrongAttempt = lastWrongAttempt;
    }

    public int getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(int isVerified) {
        this.isVerified = isVerified;
    }

    public int getIsPassChange() {
        return isPassChange;
    }

    public void setIsPassChange(int isPassChange) {
        this.isPassChange = isPassChange;
    }

    public int getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(int isAdmin) {
        this.isAdmin = isAdmin;
    }

    public LocalDate getQuestionnaireAnswered() {
        return questionnaireAnswered;
    }

    public void setQuestionnaireAnswered(LocalDate questionnaireAnswered) {
        this.questionnaireAnswered = questionnaireAnswered;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }
}
