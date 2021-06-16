package com.socialine.Socialine.controller;


import com.socialine.Socialine.model.ClubRequest;
import com.socialine.Socialine.repository.ClubRequestRepository;
import com.socialine.Socialine.service.ClubRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ClubRequestController {

    @Autowired
    private ClubRequestService clubRequestService;

    // GET MAPPING

    @GetMapping("/api/clubRequest/all")
    public List<ClubRequest> getClubRequests() {
        return clubRequestService.getClubRequests();
    }

    @GetMapping("/api/clubRequest/{id}")
    public ClubRequest getClubRequest(@PathVariable int id) {
        return clubRequestService.getClubById(id);
    }

    @GetMapping("/api/clubRequest/club/{clubId}")
    public List<ClubRequest> getClubRequestOfClub(@PathVariable int clubId) {
        return clubRequestService.getClubRequestByClubId(clubId);
    }

    @GetMapping("/api/clubRequest/user/{userId}")
    public List<ClubRequest> getClubRequestByUserId(@PathVariable int userId) {
        return clubRequestService.getClubRequestByUserId(userId);
    }

    @GetMapping("/api/clubRequest/name/{name}")
    public List<ClubRequest> getClubRequestByName(@PathVariable String name) {
        return clubRequestService.getClubRequestByName(name);
    }


    @PostMapping("/api/addClubRequest")
    public boolean addClubRequest(@RequestBody ClubRequest clubRequest) {
        return clubRequestService.addClubRequest(clubRequest);
    }

    @DeleteMapping("/api/clubRequest/delete/{id}")
    public boolean deleteClubRequest(@PathVariable int id) {
        return clubRequestService.deleteClubRequest(id);
    }

}
