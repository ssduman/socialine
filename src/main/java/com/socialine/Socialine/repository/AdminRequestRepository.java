package com.socialine.Socialine.repository;

import com.socialine.Socialine.model.AdminRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminRequestRepository extends JpaRepository<AdminRequest, Integer> {

    @Query("SELECT a FROM AdminRequest a where a.userId = ?1")
    List<AdminRequest> findByUserId(int userId);

    @Query("SELECT a FROM AdminRequest a where a.clubId = ?1")
    List<AdminRequest> findByClubId(int clubId);

    @Query("SELECT a FROM AdminRequest a where a.subClubId = ?1")
    List<AdminRequest> findBySubClubId(int subClubId);
}
