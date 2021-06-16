package com.socialine.Socialine.controller;

import com.socialine.Socialine.dto.AddPostRequest;
import com.socialine.Socialine.model.Post;
import com.socialine.Socialine.model.SubClubs;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.PostPOJO;
import com.socialine.Socialine.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// It will be arranged
@Lazy
@RestController
@RequestMapping("/api/Post/")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService productService) {
        this.postService = productService;
    }

    // userId, subClubId, Text
    // @RequestParam(name = "userId") int userId,
    // @RequestParam(name = "subClubId") int subClubId,
    // @RequestParam(name = "text") String text
    @PostMapping("/addPost")
    public boolean addPost(@RequestBody AddPostRequest addPostRequest) {
        return postService.savePost(addPostRequest);
    }

    @GetMapping("/posts")
    public List<PostPOJO> findAllPosts() {
        return postService.getPosts();
    }

    @GetMapping("/post/{id}")
    public List<PostPOJO> findPostById(@PathVariable Long id) {
        return postService.getPostUsingId(id);
    }

    @GetMapping("/postsByAuthor/{author}")
    public List<Post> findPostByAuthor(@PathVariable Users author) {
        return postService.getPostsByAuthor(author);
    }

    @GetMapping("/postsByAuthorId/{id}")
    public List<PostPOJO> findPostUsingAuthor(@PathVariable int id) {
        return postService.getPostsUsingAuthor(id);
    }

    @GetMapping("/postsByDate/{date}")
    public List<Post> findPostByDate(@PathVariable LocalDateTime date) {
        return postService.getPostsByDate(date);
    }

    @GetMapping("/postsBySubClub/{subClub}")
    public List<PostPOJO> findPostBySubClub(@PathVariable int subClub) {
        return postService.getPostsBySubClub(subClub);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePost(@PathVariable Long id) {
        return postService.deletePost(id);
    }

    // Post updateText(Long id,String text) --> Body
    @PutMapping("/update")
    public boolean updatePost(@RequestBody Post post) {
        return postService.updateText(post.getPostId(), post.getText());
    }
}
