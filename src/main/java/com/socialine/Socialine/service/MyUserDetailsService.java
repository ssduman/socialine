package com.socialine.Socialine.service;

import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Users user = usersRepository.findByName(name);

        if (user == null) {
            return null;
        }

        return new MyUserDetails(user);
    }
}
