package com.youtube.videoservice.controller;

import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.History;
import com.youtube.videoservice.model.User;
import com.youtube.videoservice.repository.UserRepository;
import com.youtube.videoservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping({"/", ""})
    public ResponseEntity<User> registerUser(Authentication authentication){
        Jwt jwt = (Jwt) authentication.getPrincipal();

        User user = service.registerUser(jwt.getTokenValue());
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/subscribe/{userId}")
    public ResponseEntity<String> subscribeUser(@PathVariable String userId){
        service.subscribeUser(userId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Subscribed successfully.");
    }

    @PostMapping("/unsubscribe/{userId}")
    public ResponseEntity<String> unsubscribeUser(@PathVariable String userId){
        service.unsubscribeUser(userId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Unsubscribed successfully.");
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<Set<History>> getUserHistory(@PathVariable String userId){
        Set<History> userHistory = service.getUserHistory(userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(userHistory);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId){
        Optional<User> userOptional = service.getUserById(userId);
        if(userOptional.isEmpty())
            throw new ResourceNotFoundException("User with this ID doesn't exist.");
        return ResponseEntity.status(HttpStatus.OK).body(userOptional.get());
    }

    @DeleteMapping("/history/{videoId}")
    public ResponseEntity<String> removeVideoFromWatchHistory(@PathVariable String videoId){
        service.removeFromWatchHistory(videoId);
        return ResponseEntity.status(HttpStatus.OK).body("Video removed from history successfully!!!");
    }

    @PutMapping("/history")
    public ResponseEntity<User> pauseWatchHistory(){
        User updatedUser =service.togglePauseHistory();
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
    }

    @PutMapping("/watchLater/{videoId}")
    public ResponseEntity<String> addToWatchLater(@PathVariable String videoId){
        service.addToWatchLater(videoId);
        return ResponseEntity.status(HttpStatus.OK).body("Added to Watch later successfully!!!");
    }

    @DeleteMapping("/watchLater/{videoId}")
    public ResponseEntity<Set<History>> removeFromWatchLater(@PathVariable String videoId){
        Set<History> watchLaterList = service.removeFromWatchLater(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(watchLaterList);
    }

    @DeleteMapping("/history")
    public ResponseEntity<String> clearWatchHistory(){
       service.clearWatchHistory();
        return ResponseEntity.status(HttpStatus.OK).body("Watch History cleared successfully!!!");
    }

    @DeleteMapping("/watchLater")
    public ResponseEntity<String> clearWatchLater(){
        service.clearWatchLater();
        return ResponseEntity.status(HttpStatus.OK).body("Watch Later cleared successfully!!!");
    }

    @PostMapping("/subscriptions")
    public ResponseEntity<List<User>> getUsersByIds(@RequestBody List<String> userIds){
        List<User> userSubscriptions = service.getUsersByIds(userIds);
        if (userSubscriptions.isEmpty()) {
            throw new ResourceNotFoundException("The user hasn't subscribed to anyone.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userSubscriptions);
    }
}
