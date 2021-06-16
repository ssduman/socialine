package com.socialine.Socialine.service;

import com.socialine.Socialine.model.Comment;
import com.socialine.Socialine.model.Post;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.CommentPOJO;
import com.socialine.Socialine.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Lazy
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostService postService;
    private final UsersService usersService;
    private final SubClubsService subClubsService;

    @Autowired
    public CommentService(CommentRepository repository, PostService postService, UsersService usersService, SubClubsService subClubsService) {
        this.commentRepository = repository;
        this.postService = postService;
        this.usersService = usersService;
        this.subClubsService = subClubsService;
    }

    public boolean saveComment(Long postId,int userId,String text) {
        Post post = postService.getPostById(postId);
        Users author = usersService.getUserById(userId);
        Comment comment = new Comment(LocalDateTime.now(),text);
        author.addComment(comment);
        post.addComment(comment);
        commentRepository.save(comment);
        if (post != null)
            subClubsService.updateActivity(post.getSubClub());
        return commentRepository.existsById(comment.getCommentId());
    }

    // public List<Comment> getComments() { return commentRepository.findAll(); }
    public List<CommentPOJO> getComments() {
        return commentRepository.getAllComments();
    }

    public CommentPOJO getCommentUsingId(Long id) {
        return commentRepository.findUsingId(id);
    }

    public List<CommentPOJO> getCommentUsingAuthorId(int id) { return commentRepository.findUsingAuthorId(id);
    }

    public List<CommentPOJO> getCommentUsingPostId(Long id) { return commentRepository.findUsingPostId(id);
    }

    public Comment getCommentById(long id) { return commentRepository.findById(id).orElse(null);
    }

    public List<Comment> getCommentsByAuthor(Users author) {
        return commentRepository.findByAuthor(author);
    }

    public List<Comment> getCommentsByDate(LocalDateTime date) {
        return commentRepository.findByDate(date);
    }

    public String deleteComment(Long id) {

        if(commentRepository.findById(id).isPresent()){
            Comment comment = commentRepository.findById(id).get();
            Users author = comment.getAuthor();
            Post post = comment.getPost();
            author.removeComment(comment);
            post.removeComment(comment);
        }
        else return "error";

        commentRepository.deleteById(id);
        return "The comment is removed !! " + id;
    }

    public boolean updateText(Long id, String text) {
        Comment existingComment = commentRepository.findById(id).orElse(null);
        if (existingComment == null) return false;
        existingComment.setText(text);
        existingComment.setDate(LocalDateTime.now());
        return commentRepository.save(existingComment).getText().equals(text);
    }
}
