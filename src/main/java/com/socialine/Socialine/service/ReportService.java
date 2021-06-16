package com.socialine.Socialine.service;

import com.socialine.Socialine.model.Report;
import com.socialine.Socialine.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public List<Report> getReports() {
        return reportRepository.findAll();
    }

    public Boolean saveReport(Report report) {
        reportRepository.save(report);
        return reportRepository.existsById(report.getId());
    }

    public Boolean deleteReport(int id) {
        reportRepository.deleteById(id);
        return !reportRepository.existsById(id);
    }

    public Report getReport(int id) {
        return reportRepository.findById(id).orElse(null);
    }

    public List<Report> getReportsOfReporter(int id) {
        return reportRepository.findByReporterId(id);
    }

    public List<Report> getReportsOfTarget(int id) {
        return reportRepository.findByTargetId(id);
    }
}
