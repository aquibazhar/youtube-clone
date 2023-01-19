package com.youtube.videoservice.controller;

import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.User;
import com.youtube.videoservice.repository.UserRepository;
import com.youtube.videoservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Set<String>> getUserHistory(@PathVariable String userId){
        Set<String> userHistory = service.getUserHistory(userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(userHistory);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId){
        Optional<User> userOptional = service.getUserById(userId);
        if(userOptional.isEmpty())
            throw new ResourceNotFoundException("User with this ID doesn't exist.");
        return ResponseEntity.status(HttpStatus.OK).body(userOptional.get());
    }


}
