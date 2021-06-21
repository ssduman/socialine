package com.socialine.Socialine.controller;

import com.socialine.Socialine.model.Clubs;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.SubClubPOJO;
import com.socialine.Socialine.service.ClubsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ClubsController {

    @Autowired
    private ClubsService clubsService;

    @PostMapping("/api/addclub")
    public boolean addClub(@RequestBody Clubs club) {
        return clubsService.saveClub(club);
    }

    @GetMapping("/api/club/{id}")
    public Clubs getClub(@PathVariable int id) {
        return clubsService.getClubById(id);
    }

    @GetMapping("/api/clubs")
    public List<Clubs> getClubs() {
        return clubsService.getClubs();
    }

    @GetMapping("/api/club/{id}/subclubs")
    public List<SubClubPOJO> getSubClubsOf(@PathVariable int id) {
        return clubsService.getSubClubsOfUsingId(id);
    }

    @GetMapping("/api/club/{id}/creator")
    public Users getCreatorOf(@PathVariable int id) {
        return clubsService.getCreatorOf(id);
    }

    @GetMapping("/api/club/{id}/admin")
    public Users getAdminOf(@PathVariable int id) {
        return clubsService.getAdminOf(id);
    }

    @GetMapping("/api/club/name/{name}")
    public Clubs getClubByName(@PathVariable String name) {
        return clubsService.getClubByName(name);
    }

    @PutMapping("/api/updclubs")
    public Boolean updClub(@RequestBody Clubs club) {
        return clubsService.updateClub(club);
    }

    @DeleteMapping("/api/club/delete/{id}")
    public Boolean deleteClub(@PathVariable int id) {
        return clubsService.deleteClub(id);
    }
}
