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
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table()
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Users.class)
public class Users {

    @Id
    @GeneratedValue
    private int id;

    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserMemberships> userMemberships;

    private String realName;
    private String name;
    private String email;
    private String password;
    private LocalDate regDate;
    private LocalDate lastLogin;
    private LocalDate lastWrongAttempt;
    private int isVerified;
    private int isPassChange;
    private int isAdmin;
    private LocalDate questionnaireAnswered;
    private String about;

    @ToString.Exclude
    @OneToMany(
            mappedBy = "author",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Comment> comments = new ArrayList<>();

    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setAuthor(this);
    }

    public void removeComment(Comment comment) {
        comments.remove(comment);
        comment.setAuthor(null);
    }

    @ToString.Exclude
    @OneToMany(
            mappedBy = "author",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Post> posts = new ArrayList<>();

    public void addPost(Post post) {
        posts.add(post);
        post.setAuthor(this);
    }
//    public void addPosts(List<Post> posts) {
//        this.posts.addAll(posts);
//        for (Post post : posts) {
//            post.setAuthor(this);
//        }
//    }

    public void removePost(Post post) {
        posts.remove(post);
        post.setAuthor(null);
    }
}
