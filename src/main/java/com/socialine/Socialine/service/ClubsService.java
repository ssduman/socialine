package com.socialine.Socialine.service;

import com.socialine.Socialine.model.Clubs;
import com.socialine.Socialine.model.SubClubs;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.SubClubPOJO;
import com.socialine.Socialine.repository.ClubsRepository;
import com.socialine.Socialine.repository.SubClubsRepository;
import com.socialine.Socialine.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Service
public class ClubsService {

    private final UsersRepository usersRepository;
    private final ClubsRepository clubsRepository;
    private final SubClubsRepository subClubsRepository;
    private final SubClubsService subClubsService;

    public Boolean saveClub(Clubs club) {

        // id check
        if (isExistClub(club.getId())) {
            throw new IllegalStateException(club.getId() + " id is already exist");
        }

        // name check
        if (isExistClub(club.getName())) {
            throw new IllegalStateException(club.getName() + " is already exist");
        }

        checkNameLength(club.getName());

        // admin check
        if (!isAdminExist(club.getAdminId())) {
            throw new IllegalStateException(club.getAdminId() + " admin id does not exist");
        }

        // creator check
        if (!isCreatorExist(club.getCreatorId())) {
            throw new IllegalStateException(club.getAdminId() + " creator id does not exist");
        }

        club.setCreationDate(LocalDate.now());
        clubsRepository.save(club);
        return clubsRepository.existsById(club.getId());
    }

    public List<Clubs> getClubs() {
        return clubsRepository.findAll();
    }

    public Clubs getClubById(int id) {
        return clubsRepository.findById(id).orElse(null);
    }

    public Clubs getClubByName(String name) {
        return clubsRepository.findByName(name).orElse(null);
    }

    public Boolean deleteClub(int id) {
        if (!isExistClub(id)) {
            throw new IllegalStateException(id + " id club does not exist");
        }

        List<SubClubs> subClubsList = getSubClubsOf(id);
        for (SubClubs s : subClubsList) {
            subClubsService.deleteSubClub(s.getId());
        }
        clubsRepository.deleteById(id);
        return !clubsRepository.existsById(id);
    }

    @Transactional
    public Boolean updateClub(Clubs club) {
        Clubs clubById = clubsRepository.findById(club.getId()).orElse(null);

        // id check
        if (clubById == null) {
            throw new IllegalStateException("club with id " + club.getId() + " does not exist");
        }

        // same name check
        Clubs clubByName = clubsRepository.findByName(club.getName()).orElse(null);
        if (clubByName != null &&
                clubByName.getId() != club.getId()) {
            throw new IllegalStateException(club.getName() + " club is already exist with another id");
        }

        checkNameLength(club.getName());

        // admin check
        if (!isAdminExist(club.getAdminId())) {
            throw new IllegalStateException(club.getAdminId() + " admin id does not exist");
        }

        // creator check
        if (!isCreatorExist(club.getCreatorId())) {
            throw new IllegalStateException(club.getAdminId() + " creator id does not exist");
        }

        // updating
        clubById.update(club);
        // clubsRepository.save(clubById);
        return true;
    }

    public List<SubClubs> getSubClubsOf(int id) {

        if (!isExistClub(id)) {
            throw new IllegalStateException(id + " id club does not exist");
        }

        return subClubsRepository.findAllByParentId(id);
    }

    public List<SubClubPOJO> getSubClubsOfUsingId(int id) {

        if (!isExistClub(id)) {
            throw new IllegalStateException(id + " id club does not exist");
        }

        return subClubsRepository.getAllParentUsingId(id);
    }

    public Users getCreatorOf(int id) {
        Clubs clubById = clubsRepository.findById(id).orElse(null);

        // id check
        if (clubById == null) {
            throw new IllegalStateException("club with id " + id + " does not exist");
        }

        return usersRepository.findById(clubById.getCreatorId()).orElse(null);
    }

    public Users getAdminOf(int id) {
        Clubs clubById = clubsRepository.findById(id).orElse(null);

        // id check
        if (clubById == null) {
            throw new IllegalStateException("club with id " + id + " does not exist");
        }

        return usersRepository.findById(clubById.getAdminId()).orElse(null);
    }

    private boolean isExistClub(int id) {
        return clubsRepository.existsById(id);
    }

    private boolean isExistClub(String name) {
        return clubsRepository.existsByName(name);
    }

    private boolean isCreatorExist(int creatorId) {
        if (creatorId == 0) {
            return true;
        }
        return usersRepository.existsById(creatorId);
    }

    private boolean isAdminExist(int adminId) {
        if (adminId == 0) {
            return true;
        }
        return usersRepository.existsById(adminId);
    }

    private void checkNameLength(String name) {
        int MIN_CLUB_NAME_LENGTH = 4;
        if (name.length() < MIN_CLUB_NAME_LENGTH) {
            throw new IllegalStateException(name + " club name is too short");
        }

        int MAX_CLUB_NAME_LENGTH = 30;
        if (name.length() > MAX_CLUB_NAME_LENGTH) {
            throw new IllegalStateException(name + " club name is too long");
        }
    }
}
