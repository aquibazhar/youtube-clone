package com.youtube.videoservice.controller;

import com.youtube.videoservice.model.User;
import com.youtube.videoservice.repository.UserRepository;
import com.youtube.videoservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
