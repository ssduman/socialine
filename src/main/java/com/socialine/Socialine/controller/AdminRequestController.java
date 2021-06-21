package com.socialine.Socialine.controller;

import com.socialine.Socialine.model.AdminRequest;
import com.socialine.Socialine.service.AdminRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AdminRequestController {

    @Autowired
    public AdminRequestService adminRequestService;

    @GetMapping("/api/adminRequest/all")
    public List<AdminRequest> getAdminRequests() {
        return adminRequestService.getAdminRequests();
    }

    @GetMapping("/api/adminRequest/user/{userId}")
    public List<AdminRequest> getAdminRequestOfUser(@PathVariable int userId) {
        return adminRequestService.getAdminRequestOfUser(userId);
    }

    @GetMapping("/api/adminRequest/{id}")
    public AdminRequest getAdminRequest(@PathVariable int id) {
        return adminRequestService.getAdminRequest(id);
    }

    @GetMapping("/api/adminRequest/club/{clubId}")
    public List<AdminRequest> getAdminRequestOfClub(@PathVariable int clubId) {
        return adminRequestService.getAdminRequestOfClub(clubId);
    }

    @GetMapping("/api/adminRequest/subClub/{subClubId}")
    public List<AdminRequest> getAdminRequestOfSubClub(@PathVariable int subClubId) {
        return adminRequestService.getAdminRequestOfSubClub(subClubId);
    }

    @PostMapping("/api/addAdminRequest")
    public boolean addAdminRequest(@RequestBody AdminRequest adminRequest) {
        return adminRequestService.addAdminRequest(adminRequest);
    }

    @DeleteMapping("/api/adminRequest/delete/{id}")
    public boolean deleteAdminRequest(@PathVariable int id) {
        return adminRequestService.deleteAdminRequest(id);
    }
}
