package com.socialine.Socialine.repository;

import com.socialine.Socialine.model.Post;
import com.socialine.Socialine.model.SubClubs;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.PostPOJO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthor(Users author);

    List<Post> findByDate(LocalDateTime date);

    @Query(value = "select NEW com.socialine.Socialine.pojo.PostPOJO(p.postId, p.author.id, p.subClub.id, p.date, p.text, p.title, p.isEvent) FROM Post p")
    List<PostPOJO> getAllPosts();

    @Query(value = "select NEW com.socialine.Socialine.pojo.PostPOJO(p.postId, p.author.id, p.subClub.id, p.date, p.text, p.title, p.isEvent) FROM Post p WHERE p.postId = ?1")
    List<PostPOJO> findUsingId(Long id);

    @Query(value = "select NEW com.socialine.Socialine.pojo.PostPOJO(p.postId, p.author.id, p.subClub.id, p.date, p.text, p.title, p.isEvent) FROM Post p WHERE p.subClub.id = ?1")
    List<PostPOJO> findUsingSubClub(int subClubId);

    @Query(value = "select NEW com.socialine.Socialine.pojo.PostPOJO(p.postId, p.author.id, p.subClub.id, p.date, p.text, p.title, p.isEvent) FROM Post p WHERE p.author.id = ?1")
    List<PostPOJO> findUsingAuthorId(int authorId);
}
