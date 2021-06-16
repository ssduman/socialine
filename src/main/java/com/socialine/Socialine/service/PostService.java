package com.socialine.Socialine.service;

import com.socialine.Socialine.dto.AddPostRequest;
import com.socialine.Socialine.model.Post;
import com.socialine.Socialine.model.SubClubs;
import com.socialine.Socialine.model.Users;
import com.socialine.Socialine.pojo.PostPOJO;
import com.socialine.Socialine.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Lazy
@Service
public class PostService {

    private final PostRepository postRepository;
    private final UsersService usersService;
    private final SubClubsService subClubsService;

    @Autowired
    public PostService(PostRepository postRepository, UsersService usersService, SubClubsService subClubsService) {
        this.postRepository = postRepository;
        this.usersService = usersService;
        this.subClubsService = subClubsService;
    }

    public boolean savePost(AddPostRequest addPostRequest) {
        Users author = usersService.getUserById(addPostRequest.getUserId());
        SubClubs sc = subClubsService.getSubClubById(addPostRequest.getSubClubId());
        Post post = new Post(LocalDateTime.now(), addPostRequest.getText(), addPostRequest.getTitle());
        post.setIsEvent(addPostRequest.getIsEvent());
        author.addPost(post);
        sc.addPost(post);
        subClubsService.updateActivity(sc);
        postRepository.save(post);
        return postRepository.existsById(post.getPostId());
    }

    public List<PostPOJO> getPosts() {
        return postRepository.getAllPosts();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public List<PostPOJO> getPostUsingId(Long id) {
        return postRepository.findUsingId(id);
    }

    public List<Post> getPostsByAuthor(Users author) {
        return postRepository.findByAuthor(author);
    }

    public List<PostPOJO> getPostsUsingAuthor(int id) {
        return postRepository.findUsingAuthorId(id);
    }

    public List<Post> getPostsByDate(LocalDateTime date) {
        return postRepository.findByDate(date);
    }

    public List<PostPOJO> getPostsBySubClub(int subClubId) {
        return postRepository.findUsingSubClub(subClubId);
    }

    public String deletePost(Long id) {

        if (postRepository.findById(id).isPresent()) {
            Post post = postRepository.findById(id).get();
            Users author = post.getAuthor();
            SubClubs sc = post.getSubClub();
            author.removePost(post);
            sc.removePost(post);
        } else return "error";

        postRepository.deleteById(id);
        return "The post is removed !! " + id;
    }

    public boolean updateText(Long id, String text) {
        Post existingPost = postRepository.findById(id).orElse(null);
        if (existingPost == null) return false;
        existingPost.setText(text);
        existingPost.setDate(LocalDateTime.now());
        return postRepository.save(existingPost).getText().equals(text);
    }
}
