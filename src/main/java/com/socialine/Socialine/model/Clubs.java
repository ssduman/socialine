package com.socialine.Socialine.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table()
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Clubs.class)
public class Clubs {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int Id;

    private String name;

    // @ToString.Exclude
    // @OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
    // private Set<UserMemberships> members;

    // @OneToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "userId")
    // private Users creator;

    private int creatorId;
    private int adminId;

    private LocalDate creationDate;
    private float rating;
    private int reviews;
    private String description;
    private String image;

    public void update(Clubs club) {
        if (club.getName() != null) {
            this.name = club.getName();
        }
        if (club.getDescription() != null) {
            this.description = club.getDescription();
        }

        if (club.getImage() != null) {
            this.image = club.getImage();
        }

    }
}
