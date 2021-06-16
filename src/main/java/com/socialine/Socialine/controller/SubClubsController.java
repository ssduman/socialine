package com.socialine.Socialine.controller;


import com.socialine.Socialine.model.Clubs;
import com.socialine.Socialine.model.SubClubs;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.SubClubPOJO;
import com.socialine.Socialine.pojo.UserMembershipsPOJO;
import com.socialine.Socialine.repository.SubClubsRepository;
import com.socialine.Socialine.service.ClubsService;
import com.socialine.Socialine.service.SubClubsService;
import com.socialine.Socialine.service.UserMembershipsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@AllArgsConstructor
@RestController
public class SubClubsController {


    private final SubClubsService subClubsService;
    private final UserMembershipsService membershipsService;

    /*
    POST MAPPING
     */
    @PostMapping("/api/addsubclub")
    public boolean addSubClub(@RequestBody SubClubs subClub) {
        return subClubsService.saveSubClub(subClub);
    }

    /*
    GET MAPPING
     */

    @GetMapping("/api/subclubs")
    public List<SubClubPOJO> getSubClubs() {
        List<SubClubPOJO> subClubs = subClubsService.getSubClubs();
        return getSubClubPOJOS(subClubs);
    }

    @GetMapping("/api/subclubs/{id}")
    public List<SubClubPOJO> getSubClub(@PathVariable int id) {
        List<SubClubPOJO> subClubs = subClubsService.getSubClubUsingId(id);
        return getSubClubPOJOS(subClubs);
    }

    private List<SubClubPOJO> getSubClubPOJOS(List<SubClubPOJO> subClubs) {
        for (SubClubPOJO subClub : subClubs) {
            List<UserMembershipsPOJO> result = membershipsService.getMembershipBySubClub(subClub.getSubClubId());
            int memberCount = result.size();
            float totalPoints = 0;
            int numberOfPoints = 0;
            int numberOfReviews = 0;
            for (UserMembershipsPOJO entry : result) {
                if (entry.getUserPointToSubClub() != 0) {
                    totalPoints += entry.getUserPointToSubClub();
                    numberOfPoints += 1;
                }
                if (entry.getReview() != null) {
                    numberOfReviews += 1;
                }
            }
            subClub.setNumberOfUsers(memberCount);
            subClub.setRating(numberOfPoints != 0 ? totalPoints / numberOfPoints : 0.0f);
            subClub.setReviews(numberOfReviews);
        }
        return subClubs;
    }


    @GetMapping("/api/subclubs/{subClubId}/parent")
    public Clubs getParent(@PathVariable int subClubId) {
        return subClubsService.getParentClub(subClubId);
    }

    @GetMapping("/api/subclubs/{subClubId}/creator")
    public Users getCreatorOf(@PathVariable int subClubId) {
        return subClubsService.getCreatorOf(subClubId);
    }

    @GetMapping("/api/subclubs/{subClubId}/admin")
    public Users getAdminOf(@PathVariable int subClubId) {
        return subClubsService.getAdminOf(subClubId);
    }

    @GetMapping("/api/subclubs/{subClubName}/name")
    public SubClubs getSubclubOf(@PathVariable String subClubName) {
        return subClubsService.getSubclubOf(subClubName);
    }


    /*
    PUT MAPPING
     */

    @PutMapping("/api/updsubclubs")
    public Boolean updSubClub(@RequestBody SubClubs subClub) {
        return subClubsService.updateSubClub(subClub);
    }

    /*
    DELETE MAPPING
     */

    @DeleteMapping("/api/subclubs/delete/{id}")
    public Boolean deleteSubClub(@PathVariable int id) {
        return subClubsService.deleteSubClub(id);
    }
}
