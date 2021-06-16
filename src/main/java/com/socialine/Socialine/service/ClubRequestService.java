package com.socialine.Socialine.service;

import com.socialine.Socialine.model.ClubRequest;
import com.socialine.Socialine.repository.ClubRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
public class ClubRequestService {

    @Autowired
    private ClubRequestRepository clubRequestRepository;

    public List<ClubRequest> getClubRequests() {
        return clubRequestRepository.findAll();

    }

    public boolean addClubRequest(ClubRequest clubRequest) {
        boolean ifExist = false;
        List<ClubRequest> allClubRequests = clubRequestRepository.findAll();
        for (ClubRequest cb : allClubRequests) {
            if (cb.getSubClubName().equalsIgnoreCase(clubRequest.getSubClubName())) {
                cb.getAllUsers().add(clubRequest.getUserId());
                cb.getSuggestions().add(clubRequest.getSuggestion());
                clubRequestRepository.save(cb);
                ifExist = true;
                break;
            }
        }
        if (!ifExist) {
            clubRequest.setDate(LocalDate.now());
            clubRequest.setAllUsers(new ArrayList<>());
            clubRequest.setSuggestions(new ArrayList<>());
            clubRequest.getAllUsers().add(clubRequest.getUserId());
            clubRequest.getSuggestions().add(clubRequest.getSuggestion());
            clubRequestRepository.save(clubRequest);
        }
        return true; // clubRequestRepository.existsById(clubRequest.getId());
    }

    public boolean deleteClubRequest(int id) {
        clubRequestRepository.deleteById(id);
        return !clubRequestRepository.existsById(id);
    }

    public List<ClubRequest> getClubRequestByClubId(int clubId) {
        return clubRequestRepository.findByClubId(clubId);
    }

    public List<ClubRequest> getClubRequestByUserId(int userId) {
        List<ClubRequest> users = clubRequestRepository.findByAllUsersContaining(userId);
        if (users.size() == 0) {
            users = clubRequestRepository.findByUserId(userId);
        }
        return users;
    }

    public ClubRequest getClubById(int id) {
        return clubRequestRepository.findById(id).orElse(null);
    }

    public List<ClubRequest> getClubRequestByName(String name) {
        return clubRequestRepository.findByName(name);
    }
}
