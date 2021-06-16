package com.socialine.Socialine.repository;

import com.socialine.Socialine.model.ClubRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ClubRequestRepository extends JpaRepository<ClubRequest, Integer> {

    @Query("SELECT cr FROM ClubRequest cr WHERE cr.clubId = ?1")
    List<ClubRequest> findByClubId(int clubId);

    @Query("SELECT cr FROM ClubRequest cr WHERE cr.userId = ?1")
    List<ClubRequest> findByUserId(int userId);

    @Query("SELECT cr FROM ClubRequest cr WHERE cr.subClubName = ?1")
    List<ClubRequest> findByName(String name);

    List<ClubRequest> findByAllUsersContaining(int userId);
}
