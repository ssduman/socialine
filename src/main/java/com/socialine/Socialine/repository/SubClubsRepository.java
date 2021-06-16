package com.socialine.Socialine.repository;

import com.socialine.Socialine.model.SubClubs;
import com.socialine.Socialine.pojo.SubClubPOJO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface SubClubsRepository extends JpaRepository<SubClubs, Integer> {

    boolean existsByName(String name);

    @Query("SELECT sc FROM SubClubs sc WHERE sc.name = ?1")
    Optional<SubClubs> findByName(String name);

    @Query("SELECT sc FROM SubClubs sc WHERE sc.parentId = ?1")
    List<SubClubs> findAllByParentId(int id);

    @Query(value = "select NEW com.socialine.Socialine.pojo.SubClubPOJO(s.id, s.name, s.adminId, s.creatorId, s.parentId, s.creationDate, s.lastActivity, s.description, s.image, s.rating, s.reviews) FROM SubClubs as s")
    List<SubClubPOJO> getAllSubClubs();

    @Query(value = "select NEW com.socialine.Socialine.pojo.SubClubPOJO(s.id, s.name, s.adminId, s.creatorId, s.parentId, s.creationDate, s.lastActivity, s.description, s.image, s.rating, s.reviews) FROM SubClubs s WHERE s.id = ?1")
    List<SubClubPOJO> getAllSubClubsUsingId(int id);

    @Query(value = "select NEW com.socialine.Socialine.pojo.SubClubPOJO(s.id, s.name, s.adminId, s.creatorId, s.parentId, s.creationDate, s.lastActivity, s.description, s.image, s.rating, s.reviews) FROM SubClubs s WHERE s.parentId = ?1")
    List<SubClubPOJO> getAllParentUsingId(int id);

    @Query("SELECT COUNT(*)>0 FROM SubClubs sc WHERE sc.name = ?1 AND sc.parentId = ?2")
    boolean existsByNameSameParent(String name, int id);
}
