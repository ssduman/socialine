package com.socialine.Socialine.controller;

import com.socialine.Socialine.dto.UserMembershipsRequest;
import com.socialine.Socialine.model.UserMemberships;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.UserMembershipsPOJO;
import com.socialine.Socialine.service.UserMembershipsService;
import com.socialine.Socialine.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
public class UserMembershipsController {

    private final UserMembershipsService userMembershipsService;

    @PostMapping("/api/addmembership")
    public boolean addMembership(@RequestBody UserMembershipsRequest userMembershipsRequest) {
        return userMembershipsService.saveMembership(userMembershipsRequest);
    }

    @GetMapping("/api/memberships")
    public List<UserMembershipsPOJO> getUser() {
        return userMembershipsService.getMemberships();
    }

    @GetMapping("/api/membership/user/{id}")
    public List<UserMembershipsPOJO> getUser(@PathVariable int id) {
        return userMembershipsService.getMembershipByUserId(id);
    }

    @GetMapping("/api/membership/subclub/{id}")
    public List<UserMembershipsPOJO> getSubClub(@PathVariable int id) {
        return userMembershipsService.getMembershipBySubClub(id);
    }

    @PutMapping("/api/membership/ban")
    public boolean banUser(@RequestBody UserMembershipsRequest userMembershipsRequest) {
        return userMembershipsService.updateUser(userMembershipsRequest, 0);
    }

    @PutMapping("/api/membership/unban")
    public boolean unbanUser(@RequestBody UserMembershipsRequest userMembershipsRequest) {
        return userMembershipsService.updateUser(userMembershipsRequest, 1);
    }

    @PutMapping("/api/membership/makeadmin")
    public boolean makeAdminUser(@RequestBody UserMembershipsRequest userMembershipsRequest) {
        return userMembershipsService.updateUser(userMembershipsRequest, 2);
    }

    @PutMapping("/api/membership/revokeadmin")
    public boolean revokeAdminUser(@RequestBody UserMembershipsRequest userMembershipsRequest) {
        return userMembershipsService.updateUser(userMembershipsRequest, 3);
    }

    @PutMapping("/api/membership/point")
    public boolean addPoint(@RequestBody UserMembershipsRequest userMembershipsRequest) {
        return userMembershipsService.updateUser(userMembershipsRequest, 4);
    }

    @PutMapping("/api/membership/review")
    public boolean addReview(@RequestBody UserMembershipsRequest userMembershipsRequest) {
        return userMembershipsService.updateUser(userMembershipsRequest, 5);
    }
}
