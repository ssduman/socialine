package com.socialine.Socialine.service;

import com.socialine.Socialine.model.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class MyUserDetails implements UserDetails {
    private final Users user;

    public MyUserDetails(Users user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        // List<String> perm = Arrays.asList("READ_PROFILE", "EDIT_PROFILE", "DELETE_PROFILE", "ACCESS_PUBLIC_API");
        // List<String> roles = Arrays.asList("ROLE_ADMIN", "ROLE_USER");
        // for (String p : perm) { authorities.add(new SimpleGrantedAuthority(p)); }

        // if (this.user.getRoles() == null) { this.user.setRoles(new ArrayList<>()); }

        boolean found = false;
        List<String> roles = this.user.getRoles();
        for (String r : roles) {
            if (r.equalsIgnoreCase("ROLE_USER")) {
                found = true;
            }
            authorities.add(new SimpleGrantedAuthority(r));
        }

        if (!found) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
