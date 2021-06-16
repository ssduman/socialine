package com.socialine.Socialine.service;

import com.socialine.Socialine.dto.EmailRequest;
import com.socialine.Socialine.model.Clubs;
import com.socialine.Socialine.model.SubClubs;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.CommentPOJO;
import com.socialine.Socialine.pojo.PostPOJO;
import com.socialine.Socialine.pojo.SubClubPOJO;
import com.socialine.Socialine.pojo.UserMembershipsPOJO;
import com.socialine.Socialine.repository.*;
import com.socialine.Socialine.utils.EmailSender;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.Period;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@Configuration
@EnableScheduling
@Service
public class SubClubsService {

    private final SubClubsRepository subClubsRepository;
    private final ClubsRepository clubsRepository;
    private final UsersRepository usersRepository;
    private final UserMembershipsRepository userMembershipsRepository;
    private final EmailSender emailSender;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public boolean saveSubClub(SubClubs subClub) {

        // id check
        if (isExistSubClub(subClub.getId())) {
            throw new IllegalStateException(
                    subClub.getId() + " id is already exist"
            );
        }

        // parent id check
        if (!isExistClub(subClub.getParentId())) {
            throw new IllegalStateException(
                    subClub.getParentId() + " id club does not exist"
            );
        }

        // same name same parent check
        boolean existsByNameSameParent = subClubsRepository.existsByNameSameParent(subClub.getName(), subClub.getParentId());
        if (existsByNameSameParent) {
            throw new IllegalStateException(
                    subClub.getName() + " is already exist in the same club"
            );
        }

        checkNameLength(subClub.getName());


        // admin check
        if (!isAdminExist(subClub.getAdminId())) {
            throw new IllegalStateException(
                    subClub.getAdminId() + " admin id does not exist"
            );
        }

        // creator check
        if (!isCreatorExist(subClub.getCreatorId())) {
            throw new IllegalStateException(
                    subClub.getAdminId() + " creator id does not exist or is not admin"
            );
        }

        subClub.setCreationDate(LocalDate.now());
        subClub.setLastActivity(LocalDate.now());
        subClubsRepository.save(subClub);
        return subClubsRepository.existsById(subClub.getId());

    }


    public SubClubs getSubClubById(int id) {
        return subClubsRepository.findById(id).orElse(null);
    }

    public List<SubClubPOJO> getSubClubUsingId(int id) {
        return subClubsRepository.getAllSubClubsUsingId(id);
    }

    public List<SubClubPOJO> getSubClubs() {
        return subClubsRepository.getAllSubClubs();
    }

    @Transactional
    public Boolean updateSubClub(SubClubs subClub) {
        SubClubs subClubById = subClubsRepository.findById(subClub.getId()).orElse(null);

        // id check
        if (subClubById == null) {
            throw new IllegalStateException(
                    "sub club with id " + subClub.getId() + " does not exist"
            );
        }

        // name check
        boolean existsByNameSameParent = subClubsRepository.existsByNameSameParent(subClub.getName(), subClub.getParentId());
        if (existsByNameSameParent) {
            if (subClubById.getName() != subClub.getName()) {
                throw new IllegalStateException(
                        subClub.getName() + " is already exist in the same club"
                );
            }
        }

        checkNameLength(subClub.getName());

        if (!isAdminExist(subClub.getAdminId())) {
            throw new IllegalStateException(
                    "New admin id does not exist: " + subClub.getAdminId()
            );
        }
        /*
        ////
        no need to check update function does not change parent
        ////
        int currentParentId = subClubById.getParentId();
        int newParentId = subClub.getParentId();

        if (currentParentId != newParentId) {
            throw new IllegalStateException(
                    "Parent can not be changed. Current parent id: " + currentParentId + " New parent id: " + newParentId
            );
        }
        ////
        no need to check update function does not change creator
        ////

        int currentCreatorId = subClubById.getCreatorId();
        int newCreatorId = subClub.getCreatorId();

        if (currentCreatorId != newCreatorId) {
            throw new IllegalStateException(
                    "Creator can not be changed. Current creator id: " + currentCreatorId + " New creator id: " + newCreatorId
            );
        }

        */

        //updating
        subClubById.update(subClub);
        return true;
    }

    public Boolean deleteSubClub(int id) {

        if (!isExistSubClub(id)) {
            throw new IllegalStateException(
                    id + " id sub club does not exist"
            );
        }

        // delete comments then posts
        List<PostPOJO> allP = postRepository.findUsingSubClub(id);
        for (PostPOJO postPOJO: allP){
            List<CommentPOJO>  allC = commentRepository.findUsingPostId(postPOJO.getPostId());
            for (CommentPOJO commentPOJO: allC){
                commentRepository.deleteById(commentPOJO.getCommentId());
            }
            postRepository.deleteById(postPOJO.getPostId());
        }

        // delete user memberships
        List<UserMembershipsPOJO> allUm = userMembershipsRepository.getUsingSubClubId(id);
        for (UserMembershipsPOJO um: allUm){
            userMembershipsRepository.deleteById(um.getMembershipId());
        }

        subClubsRepository.deleteById(id);
        return !subClubsRepository.existsById(id);
    }

    public Clubs getParentClub(int subClubId) {
        SubClubs subClubById = subClubsRepository.findById(subClubId).orElse(null);

        // id check
        if (subClubById == null) {
            throw new IllegalStateException(
                    "sub club with id " + subClubId + " does not exist"
            );
        }
        return clubsRepository.findById(subClubById.getParentId()).orElse(null);
    }

    public Users getCreatorOf(int id) {
        SubClubs subClubById = subClubsRepository.findById(id).orElse(null);

        // id check
        if (subClubById == null) {
            throw new IllegalStateException(
                    "sub club with id " + id + " does not exist"
            );
        }

        return usersRepository.findById(subClubById.getCreatorId()).orElse(null);
    }

    public Users getAdminOf(int id) {
        SubClubs subClubById = subClubsRepository.findById(id).orElse(null);

        // id check
        if (subClubById == null) {
            throw new IllegalStateException(
                    "club with id " + id + " does not exist"
            );
        }

        return usersRepository.findById(subClubById.getAdminId()).orElse(null);
    }

    public SubClubs getSubclubOf(String keyword) {
        SubClubs subClubByName = subClubsRepository.findByName(keyword).orElse(null);
        return subClubByName;
    }

    private void checkNameLength(String name) {
        int MIN_SUB_CLUB_NAME_LENGTH = 4;
        if (name.length() < MIN_SUB_CLUB_NAME_LENGTH) {
            throw new IllegalStateException(
                    name + " sub club name is too short"
            );
        }

        int MAX_SUB_CLUB_NAME_LENGTH = 30;
        if (name.length() > MAX_SUB_CLUB_NAME_LENGTH) {
            throw new IllegalStateException(
                    name + " sub club name is too long"
            );
        }
    }

    private boolean isExistSubClub(int id) {
        return subClubsRepository.existsById(id);
    }

    private boolean isExistClub(int parentId) {
        return clubsRepository.existsById(parentId);
    }


    private boolean isExistSubClub(String name) {
        return subClubsRepository.existsByName(name);
    }

    private boolean isCreatorExist(int creatorId) {
        Users user = usersRepository.findById(creatorId).orElse(null);
        if (user == null) {
            return false;
        }
        if (1 == user.getIsAdmin()) {
            return true;
        }
        return false;
    }

    private boolean isAdminExist(int adminId) {
        //will be assign later
        if (adminId == 0) {
            return true;
        }
        return usersRepository.existsById(adminId);
    }

    @Transactional
    public void updateActivity(SubClubs sc) {
        if (sc != null) {
            sc.updAct();
        }
    }

    /*
    for testing every 10 sec
    //@Scheduled(cron = "0,10,20,30,40,50 * * * * *")

    */
    //everyday 16:00
    @Scheduled(cron = "0 0 16 * * *")
    public void isFadingAnySubClub(){
        List<SubClubs> allSc = subClubsRepository.findAll();
        LocalDate today = LocalDate.now();
        Period p;
        for (SubClubs sc: allSc) {
            p = Period.between(sc.getLastActivity(), today);

            // if(true) // testing
            if (p.getYears() == 0 && p.getMonths() == 2 && p.getDays() >= 25)
            {
                EmailRequest emailRequest = new EmailRequest();
                emailRequest.setText("The club named " + sc.getName() + " has not been active for " + (p.getMonths()*30 + p.getDays()) + " days." +
                        " If this club has not been active for 90 days, it will be deleted.");
                emailRequest.setSubject(sc.getName() + " will be deleted");
                List<UserMembershipsPOJO> allUm = userMembershipsRepository.getUsingSubClubId(sc.getId());
                for (UserMembershipsPOJO um: allUm){
                    emailRequest.setEmail(um.getUserMail());
                    emailSender.sendEmail(emailRequest);
                }
            }

            //if (true) // testing
            if (p.getMonths() >= 3 || p.getYears() >= 1 || p.getDays() >= 90)
            {
                EmailRequest emailRequest = new EmailRequest();
                emailRequest.setText("Unfortunately, the club named " + sc.getName() +  " was deleted because it has not been active for 90 days." +
                        " Enjoy with other clubs.");
                emailRequest.setSubject(sc.getName() + " was deleted");
                List<UserMembershipsPOJO> allUm = userMembershipsRepository.getUsingSubClubId(sc.getId());
                for (UserMembershipsPOJO um: allUm){
                    emailRequest.setEmail(um.getUserMail());
                    emailSender.sendEmail(emailRequest);
                }
                deleteSubClub(sc.getId());
            }
        }
    }

}
