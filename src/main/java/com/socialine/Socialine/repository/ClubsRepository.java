package com.socialine.Socialine.repository;

import com.socialine.Socialine.model.Clubs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ClubsRepository extends JpaRepository<Clubs, Integer> {

    Boolean existsByName(String name);


    @Query("SELECT c FROM Clubs c WHERE c.name = ?1")
    Optional<Clubs> findByName(String name);
}
