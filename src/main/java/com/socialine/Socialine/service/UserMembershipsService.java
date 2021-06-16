package com.socialine.Socialine.service;

import com.socialine.Socialine.dto.UserMembershipsRequest;
import com.socialine.Socialine.model.Clubs;
import com.socialine.Socialine.model.SubClubs;
import com.socialine.Socialine.model.UserMemberships;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.UserMembershipsPOJO;
import com.socialine.Socialine.repository.ClubsRepository;
import com.socialine.Socialine.repository.SubClubsRepository;
import com.socialine.Socialine.repository.UserMembershipsRepository;
import com.socialine.Socialine.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserMembershipsService {

    private final UsersRepository usersRepository;
    private final ClubsRepository clubsRepository;
    private final SubClubsRepository subClubsRepository;
    private final UserMembershipsRepository userMembershipsRepository;
    private final SubClubsService subClubsService;

    public boolean saveMembership(UserMembershipsRequest userMembershipsRequest) {
        UserMemberships userMemberships = new UserMemberships();

        Optional<Users> s_user = usersRepository.findById(userMembershipsRequest.getUser());
        if (s_user.isPresent()) {
            userMemberships.setUser(s_user.get());

            Optional<Clubs> s_club = clubsRepository.findById(userMembershipsRequest.getClub());
            if (s_club.isPresent()) {
                userMemberships.setClub(s_club.get());

                Optional<SubClubs> s_subClub = subClubsRepository.findById(userMembershipsRequest.getSubClub());
                if (s_subClub.isPresent()) {
                    userMemberships.setSubClub(s_subClub.get());

                    userMemberships.setIsAdmin(userMembershipsRequest.getIsAdmin());
                    userMemberships.setUserPointToSubClub(userMembershipsRequest.getUserPointToSubClub());
                    userMemberships.setIsBanned(0);
                    userMemberships.setJoinDate(LocalDate.now());

                    boolean s_exist = userMembershipsRepository.existsByUserAndClubAndSubClub(s_user.get(), s_club.get(), s_subClub.get());
                    if (s_exist) {
                        return false;
                    }

                    userMembershipsRepository.save(userMemberships);
                    subClubsService.updateActivity(s_subClub.get());
                    return true;
                }
            }
        }

        return false;
    }

    public List<UserMemberships> saveMemberships(List<UserMemberships> membership) {
        return userMembershipsRepository.saveAll(membership);
    }

    public List<UserMembershipsPOJO> getMemberships() {
        return userMembershipsRepository.getAll();
    }

    public List<UserMembershipsPOJO> getMembershipByUserId(int id) {
        return userMembershipsRepository.getUsingUserId(id);
    }

    public List<UserMembershipsPOJO> getMembershipBySubClub(int id) {
        return userMembershipsRepository.getUsingSubClubId(id);
    }

    public boolean updateUser(UserMembershipsRequest userMembershipsRequest, int type) {
        Optional<Users> s_user = usersRepository.findById(userMembershipsRequest.getUser());
        if (s_user.isPresent()) {

            Optional<Clubs> s_club = clubsRepository.findById(userMembershipsRequest.getClub());
            if (s_club.isPresent()) {

                Optional<SubClubs> s_subClub = subClubsRepository.findById(userMembershipsRequest.getSubClub());
                if (s_subClub.isPresent()) {

                    UserMemberships userMemberships = userMembershipsRepository.findUserMembershipsByUserAndClubAndSubClub(s_user.get(), s_club.get(), s_subClub.get());
                    if (userMemberships != null) {

                        if (type == 0) {
                            userMemberships.setIsBanned(1);
                            userMemberships.setBanDate(userMembershipsRequest.getBanDate());
                            userMemberships.setBanDuration(userMembershipsRequest.getBanDuration());
                            userMemberships.setBanReason(userMembershipsRequest.getBanReason());
                        }
                        else if (type == 1) {
                            userMemberships.setIsBanned(0);
                            userMemberships.setBanDate(null);
                            userMemberships.setBanDuration(0);
                            userMemberships.setBanReason(null);
                        }
                        else if (type == 2) {
                            userMemberships.setIsAdmin(1);
                        }
                        else if (type == 3) {
                            userMemberships.setIsAdmin(0);
                        }
                        else if (type == 4) {
                            userMemberships.setUserPointToSubClub(userMembershipsRequest.getUserPointToSubClub());
                        }
                        else if (type == 5) {
                            userMemberships.setReview(userMembershipsRequest.getReview());
                        }

                        userMembershipsRepository.save(userMemberships);
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
