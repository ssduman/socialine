package com.socialine.Socialine.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table()
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = ClubRequest.class)
public class ClubRequest {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    private int userId;
    private int clubId;
    private String clubName;
    private String subClubName;
    private String suggestion;
    private LocalDate date;

    @ElementCollection
    private List<Integer> allUsers;

    @ElementCollection
    private List<String> suggestions;
}
