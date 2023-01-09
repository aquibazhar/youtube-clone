package com.youtube.videoservice.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youtube.videoservice.dto.UserDto;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.User;
import com.youtube.videoservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Value("${auth0.userInfoEndpoint}")
    private String userInfoEndpoint;

    @Override
    public User registerUser(String tokenValue) {
        HttpRequest httpRequest = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create(userInfoEndpoint))
                .setHeader("Authorization", "Bearer " + tokenValue)
                .build();
        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .build();


        User savedUser;
        try {
            HttpResponse<String> responseString = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            String body = responseString.body();

            ObjectMapper objectMapper = new ObjectMapper();
            // Here we configure that in case response body contains more fields than we expected objectMapper won't fail
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            UserDto userDto = objectMapper.readValue(body, UserDto.class);
            User user = new User();
            user.setFirstName(userDto.getGivenName());
            user.setLastName(userDto.getFamilyName());
            user.setFullName(userDto.getName());
            user.setSub(userDto.getSub());
            user.setEmailAddress(userDto.getEmail());
            user.setPicture(userDto.getPicture());
            savedUser = repository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("An exception occurred while registering the user.", e);
        }

        return savedUser;
    }

    @Override
    public User getCurrentUser() {
        String sub = ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getClaim("sub");
        Optional<User> userOptional = repository.findBySub(sub);
        if (userOptional.isEmpty())
            throw new ResourceNotFoundException("A user with this sub doesn't exist");
        return userOptional.get();
    }

    @Override
    public void addToLikedVideos(String videoId) {
        User currentUser = this.getCurrentUser();
        currentUser.addToLikedVideos(videoId);
        repository.save(currentUser);
    }

    @Override
    public void removeFromLikedVideos(String videoId) {
        User currentUser = this.getCurrentUser();
        currentUser.removeFromLikedVideos(videoId);
        repository.save(currentUser);
    }

    @Override
    public void addToDislikedVideos(String videoId) {
        User currentUser = this.getCurrentUser();
        currentUser.addToDislikedVideos(videoId);
        repository.save(currentUser);
    }


    @Override
    public void removeFromDislikedVideos(String videoId) {
        User currentUser = this.getCurrentUser();
        currentUser.removeFromDislikedVideos(videoId);
        repository.save(currentUser);
    }

    @Override
    public boolean ifLikedVideo(String videoId) {
        return this.getCurrentUser().getLikedVideos().stream().anyMatch((likedVideo) -> likedVideo.equals(videoId));
    }

    @Override
    public boolean ifDislikedVideo(String videoId) {
        return this.getCurrentUser().getDislikedVideos().stream().anyMatch((dislikedVideo) -> dislikedVideo.equals(videoId));
    }


}