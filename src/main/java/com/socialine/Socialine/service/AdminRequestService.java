package com.socialine.Socialine.service;

import com.socialine.Socialine.model.AdminRequest;
import com.socialine.Socialine.repository.AdminRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminRequestService {

    @Autowired
    private AdminRequestRepository adminRequestRepository;

    public List<AdminRequest> getAdminRequests() {
        return adminRequestRepository.findAll();
    }

    public boolean addAdminRequest(AdminRequest adminRequest) {
        adminRequestRepository.save(adminRequest);
        return adminRequestRepository.existsById(adminRequest.getId());
    }

    public boolean deleteAdminRequest(int id) {
        adminRequestRepository.deleteById(id);
        return !adminRequestRepository.existsById(id);
    }

    public List<AdminRequest> getAdminRequestOfUser(int userId) {
        return adminRequestRepository.findByUserId(userId);
    }

    public List<AdminRequest> getAdminRequestOfClub(int clubId) {
        return adminRequestRepository.findByClubId(clubId);
    }

    public List<AdminRequest> getAdminRequestOfSubClub(int subClubId) {
        return adminRequestRepository.findBySubClubId(subClubId);
    }

    public AdminRequest getAdminRequest(int id) {
        return adminRequestRepository.findById(id).orElse(null);
    }
}
