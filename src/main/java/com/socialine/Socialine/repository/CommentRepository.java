package com.socialine.Socialine.repository;

import com.socialine.Socialine.model.Comment;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.CommentPOJO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    List<Comment> findByAuthor(Users author);
    List<Comment> findByDate(LocalDateTime date);

    @Query(value = "select NEW com.socialine.Socialine.pojo.CommentPOJO(c.commentId, c.author.id, c.post.postId, c.text, c.date) FROM Comment c")
    List<CommentPOJO> getAllComments();

    @Query(value = "select NEW com.socialine.Socialine.pojo.CommentPOJO(c.commentId, c.author.id, c.post.postId, c.text, c.date) FROM Comment c WHERE c.commentId = ?1")
    CommentPOJO findUsingId(Long commentId);

    @Query(value = "select NEW com.socialine.Socialine.pojo.CommentPOJO(c.commentId, c.author.id, c.post.postId, c.text, c.date) FROM Comment c WHERE c.author.id = ?1")
    List<CommentPOJO> findUsingAuthorId(int authorId);

    @Query(value = "select NEW com.socialine.Socialine.pojo.CommentPOJO(c.commentId, c.author.id, c.post.postId, c.text, c.date) FROM Comment c WHERE c.post.postId = ?1")
    List<CommentPOJO> findUsingPostId(Long postId);
}
