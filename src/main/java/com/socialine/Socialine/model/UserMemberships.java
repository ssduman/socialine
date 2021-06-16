package com.socialine.Socialine.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table()
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "membershipId", scope = UserMemberships.class)
public class UserMemberships {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int membershipId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Clubs club;

    @ManyToOne(fetch = FetchType.LAZY)
    private SubClubs subClub;

    private int isAdmin;
    private int userPointToSubClub;
    private String review;
    private int isBanned;
    private LocalDate joinDate;
    private LocalDate banDate;
    private LocalDate banRevoke;
    private int banDuration;
    private String banReason;
}
