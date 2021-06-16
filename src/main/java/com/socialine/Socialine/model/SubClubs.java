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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = SubClubs.class)
public class SubClubs {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    private String name;

    private int adminId;
    private int creatorId;
    private LocalDate creationDate;
    private LocalDate lastActivity;
    private String description;
    private int parentId;
    private String image;
    public float rating;
    public int reviews;


    public void update(SubClubs subClub) {

        if (subClub.getName() != null) {
            this.name = subClub.getName();
        }
        if (subClub.getDescription() != null) {
            this.description = subClub.getDescription();
        }

        if (subClub.getImage() != null) {
            this.image = subClub.getImage();
        }

        if (subClub.getAdminId() != 0) {
            this.adminId = subClub.getAdminId();
        }
        this.updAct();
    }



    public void updAct() {
        this.lastActivity = LocalDate.now();
    }

    @OneToMany(
            mappedBy = "subClub",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Post> posts = new ArrayList<>();

    public void addPost(Post post) {
        posts.add(post);
        post.setSubClub(this);
    }

    public void removePost(Post post) {
        posts.remove(post);
        post.setSubClub(null);
    }
}
