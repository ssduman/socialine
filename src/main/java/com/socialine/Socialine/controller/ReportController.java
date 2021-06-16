package com.socialine.Socialine.controller;

import com.socialine.Socialine.model.Report;
import com.socialine.Socialine.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ReportController {

    @Autowired
    private ReportService reportService;

    // GET MAPPING

    @GetMapping("/api/reports")
    public List<Report> getReports() {
        return reportService.getReports();
    }

    @GetMapping("/api/report/{id}")
    public Report getReport(@PathVariable int id) {
        return reportService.getReport(id);
    }

    @GetMapping("/api/report/reporter/{id}")
    public List<Report> getReportsOfReporter(@PathVariable int id) {
        return reportService.getReportsOfReporter(id);
    }

    @GetMapping("/api/report/target/{id}")
    public List<Report> getReportsOfTarget(@PathVariable int id) {
        return reportService.getReportsOfTarget(id);
    }


    @PostMapping("/api/addreport")
    public boolean addReport(@RequestBody Report report) {
        return reportService.saveReport(report);
    }

    @DeleteMapping("/api/report/delete/{id}")
    public boolean deleteReports(@PathVariable int id) {
        return reportService.deleteReport(id);
    }


}
