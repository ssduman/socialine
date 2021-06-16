package com.socialine.Socialine.service;

import com.socialine.Socialine.dto.UsersRequest;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.UsersPOJO;
import com.socialine.Socialine.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }

    public List<Users> saveUsers(List<Users> users) {
        return usersRepository.saveAll(users);
    }

    public List<UsersPOJO> getUsers() {
        return usersRepository.getAllUsers();
    }

    public Users getUserById(int id) {
        return usersRepository.findById(id).orElse(null);
    }

    public List<UsersPOJO> getUserUsingId(int id) {
        return usersRepository.getUserUsingId(id);
    }

    public Users getUserByName(String name) {
        return usersRepository.findByName(name);
    }

    public String deleteUser(int id) {
        usersRepository.deleteById(id);
        return "deleted: " + id;
    }

    public boolean updateUser(UsersRequest usersRequest, int type) {
        Users updUser = usersRepository.findById(usersRequest.getId()).orElse(null);
        if (updUser != null) {
            if (type == 0) {
                updUser.setName(usersRequest.getName());
            }
            if (type == 1) {
                updUser.setAbout(usersRequest.getAbout());
            }
            if (type == 2) {
                updUser.setIsAdmin(1);
            }
            if (type == 3) {
                updUser.setIsAdmin(0);
            }

            usersRepository.save(updUser);
            return true;
        }

        return false;
    }

    public boolean updateUserAbout(int id, String about) {
        Users updUser = usersRepository.findById(id).orElse(null);
        if (updUser != null) {
            updUser.setAbout(about);
            usersRepository.save(updUser);

            return true;
        }

        return false;
    }
}
