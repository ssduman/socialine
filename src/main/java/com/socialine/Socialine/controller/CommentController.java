package com.socialine.Socialine.controller;

import com.socialine.Socialine.dto.CommentRequest;
import com.socialine.Socialine.model.Comment;
import com.socialine.Socialine.pojo.CommentPOJO;
import com.socialine.Socialine.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Lazy
@RestController
@RequestMapping("/api/Comment/")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/addComment")
    public boolean addComment(@RequestBody CommentRequest commentRequest) {
        return commentService.saveComment(commentRequest.getPostId(), commentRequest.getUserId(), commentRequest.getText());
    }

    @GetMapping("/comments")
    public List<CommentPOJO> findAllComments() {
        return commentService.getComments();
    }

    @GetMapping("/comment/{id}")
    public CommentPOJO findCommentById(@PathVariable Long id) {
        return commentService.getCommentUsingId(id);
    }

    @GetMapping("/comment/author/{authorId}")
    public List<CommentPOJO> findCommentByAuthor(@PathVariable int authorId) {
        return commentService.getCommentUsingAuthorId(authorId);
    }

    @GetMapping("/comment/post/{postId}")
    public List<CommentPOJO> findCommentByPost(@PathVariable Long postId) {
        return commentService.getCommentUsingPostId(postId);
    }

    @GetMapping("/comment/date/{date}")
    public List<Comment> findCommentByDate(@PathVariable LocalDateTime date) {
        return commentService.getCommentsByDate(date);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteComment(@PathVariable Long id) {
        return commentService.deleteComment(id);
    }

    @PutMapping("/update")
    public boolean updateComment(@RequestBody CommentRequest commentRequest) {
        return commentService.updateText(commentRequest.getCommentId(), commentRequest.getText());
    }
}

