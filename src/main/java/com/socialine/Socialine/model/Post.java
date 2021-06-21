package com.socialine.Socialine.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Post")
@Table()
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "postId", scope = Post.class)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_sequence")
    @SequenceGenerator(name = "post_sequence", sequenceName = "post_sequence", allocationSize = 1)
    @Column(
            name = "post_id",
            updatable = false
    )
    private @Setter(AccessLevel.PROTECTED)
    Long postId;

    // @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Users author;

    private LocalDateTime date;

    // @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subClubId")
    private SubClubs subClub;

    private String text;

    private String title;

    private int isEvent;

    // @ToString.Exclude
    @OneToMany(
            mappedBy = "post",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Comment> comments = new ArrayList<>();

    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setPost(this);
    }

    public void removeComment(Comment comment) {
        comments.remove(comment);
        comment.setPost(null);
    }

    public Post(LocalDateTime date, String text) {
        this.date = date;
        this.text = text;
    }

    public Post(LocalDateTime date, String text, String title) {
        this.date = date;
        this.text = text;
        this.title = title;
    }

//    @Override
//    public String toString() {
//        return "{" +
//                postId + ", " + author.getId() + ", " + subClub.getId() + ", " + text
//                + "}";
//    }
}
