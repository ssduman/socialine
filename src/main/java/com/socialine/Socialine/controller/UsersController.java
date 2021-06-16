package com.socialine.Socialine.controller;

import com.socialine.Socialine.dto.UsersRequest;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.UsersPOJO;
import com.socialine.Socialine.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/api/users")
    public List<UsersPOJO> getUser() {
        return usersService.getUsers();
    }

    @GetMapping("/api/user/{id}")
    public List<UsersPOJO> getUserUsingId(@PathVariable int id) {
        return usersService.getUserUsingId(id);
    }

    @PutMapping("/api/user/name")
    public boolean updUser(@RequestBody UsersRequest usersRequest) {
        return usersService.updateUser(usersRequest, 0);
    }

    @PutMapping("/api/user/about")
    public boolean updAbut(@RequestBody UsersRequest usersRequest) {
        return usersService.updateUser(usersRequest, 1);
    }

    @PutMapping("/api/user/makeadmin")
    public boolean makeAdminUser(@RequestBody UsersRequest usersRequest) {
        return usersService.updateUser(usersRequest, 2);
    }

    @PutMapping("/api/user/revokeadmin")
    public boolean revokeAdminUser(@RequestBody UsersRequest usersRequest) {
        return usersService.updateUser(usersRequest, 3);
    }

    @DeleteMapping("/api/user/delete/{id}")
    public String deleteUser(@PathVariable int id) {
        return usersService.deleteUser(id);
    }

}
