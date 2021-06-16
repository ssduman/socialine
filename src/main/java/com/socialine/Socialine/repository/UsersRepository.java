package com.socialine.Socialine.repository;

import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.PostPOJO;
import com.socialine.Socialine.pojo.UsersPOJO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    Users findByName(String name);
    Users findByEmail(String email);

    @Query(value = "select NEW com.socialine.Socialine.pojo.UsersPOJO(u.realName, u.name, u.email, u.password, u.regDate, u.lastLogin, u.lastWrongAttempt, u.isVerified, u.isPassChange, u.isAdmin, u.questionnaireAnswered, u.about) FROM Users u")
    List<UsersPOJO> getAllUsers();

    @Query(value = "select NEW com.socialine.Socialine.pojo.UsersPOJO(u.realName, u.name, u.email, u.password, u.regDate, u.lastLogin, u.lastWrongAttempt, u.isVerified, u.isPassChange, u.isAdmin, u.questionnaireAnswered, u.about) FROM Users u WHERE u.id = ?1")
    List<UsersPOJO> getUserUsingId(int id);
}
