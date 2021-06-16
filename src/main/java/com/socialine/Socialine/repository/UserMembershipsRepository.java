package com.socialine.Socialine.repository;

import com.socialine.Socialine.model.Clubs;
import com.socialine.Socialine.model.SubClubs;
import com.socialine.Socialine.model.UserMemberships;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.PostPOJO;
import com.socialine.Socialine.pojo.UserMembershipsPOJO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserMembershipsRepository extends JpaRepository<UserMemberships, Integer> {

    @Query(value = "select NEW com.socialine.Socialine.pojo.UserMembershipsPOJO(" +
            "u.membershipId, u.user.id, u.user.name, u.user.email, u.club.Id, u.club.name, u.subClub.id, u.subClub.name, u.subClub.image, u.subClub.description, u.isAdmin, u.userPointToSubClub, u.review, u.isBanned, u.joinDate" +
            ") FROM UserMemberships u")
    List<UserMembershipsPOJO> getAll();

    @Query(value = "select NEW com.socialine.Socialine.pojo.UserMembershipsPOJO(" +
            "u.membershipId, u.user.id, u.user.name, u.user.email, u.club.Id, u.club.name, u.subClub.id, u.subClub.name, u.subClub.image, u.subClub.description, u.isAdmin, u.userPointToSubClub, u.review, u.isBanned, u.joinDate" +
            ") FROM UserMemberships u WHERE u.user.id = ?1")
    List<UserMembershipsPOJO> getUsingUserId(int id);

    @Query(value = "select NEW com.socialine.Socialine.pojo.UserMembershipsPOJO(" +
            "u.membershipId, u.user.id, u.user.name, u.user.email, u.club.Id, u.club.name, u.subClub.id, u.subClub.name, u.subClub.image, u.subClub.description, u.isAdmin, u.userPointToSubClub, u.review, u.isBanned, u.joinDate" +
            ") FROM UserMemberships u WHERE u.subClub.id = ?1")
    List<UserMembershipsPOJO> getUsingSubClubId(int id);

    boolean existsByUserAndClubAndSubClub(Users user, Clubs club, SubClubs subClub);

    UserMemberships findUserMembershipsByUserAndClubAndSubClub(Users user, Clubs club, SubClubs subClub);
}
