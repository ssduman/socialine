package com.socialine.Socialine.repository;


import com.socialine.Socialine.model.Report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Integer> {

    @Query("SELECT r FROM Report r WHERE r.reporterId = ?1")
    List<Report> findByReporterId(int id);

    @Query("SELECT r FROM Report r WHERE r.targetId = ?1")
    List<Report> findByTargetId(int id);
}
