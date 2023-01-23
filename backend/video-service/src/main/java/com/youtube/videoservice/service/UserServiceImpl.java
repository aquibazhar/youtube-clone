package com.youtube.videoservice.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youtube.videoservice.dto.UserDto;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.History;
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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
            Optional<User> userOptional = repository.findBySub(userDto.getSub());
            if (userOptional.isPresent()) {
                return userOptional.get();
            } else {
                User user = new User();
                user.setFirstName(userDto.getGivenName());
                user.setLastName(userDto.getFamilyName());
                user.setFullName(userDto.getName());
                user.setSub(userDto.getSub());
                user.setEmailAddress(userDto.getEmail());
                user.setPicture(userDto.getPicture());
                return repository.save(user);
            }

        } catch (Exception e) {
            throw new RuntimeException("An exception occurred while registering the user.", e);
        }
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

    @Override
    public void addToHistory(History history) {
        User currentUser = this.getCurrentUser();
        if (!currentUser.isPauseHistory()) {
            currentUser.addToHistory(history);
            repository.save(currentUser);
        }
    }

    @Override
    public void subscribeUser(String userId) {
        User currentUser = this.getCurrentUser();
        currentUser.subscribeToUser(userId);

        Optional<User> userOptional = repository.findById(userId);
        if (userOptional.isEmpty())
            throw new ResourceNotFoundException("A user with this ID doesn't exist");
        User user = userOptional.get();

        user.incrementSubscribers(currentUser.getId());

        repository.save(currentUser);
        repository.save(user);
    }

    @Override
    public void unsubscribeUser(String userId) {
        User currentUser = this.getCurrentUser();
        currentUser.unsubscribeFromUser(userId);

        Optional<User> userOptional = repository.findById(userId);
        if (userOptional.isEmpty())
            throw new ResourceNotFoundException("A user with this ID doesn't exist");
        User user = userOptional.get();

        user.decrementSubscribers(currentUser.getId());

        repository.save(currentUser);
        repository.save(user);
    }

    @Override
    public Set<History> getUserHistory(String userId) {
        Optional<User> userOptional = repository.findById(userId);
        if (userOptional.isEmpty())
            throw new ResourceNotFoundException("A user with this ID doesn't exist");
        User user = userOptional.get();

        return user.getVideoHistory();
    }

    @Override
    public Optional<User> getUserById(String userId) {
        return repository.findById(userId);
    }

    @Override
    public void removeFromWatchHistory(String videoId) {
        User currentUser = this.getCurrentUser();
        currentUser.removeFromWatchHistory(videoId);
        repository.save(currentUser);
    }

    @Override
    public User togglePauseHistory() {
        User currentUser = this.getCurrentUser();
        currentUser.setPauseHistory(!currentUser.isPauseHistory());
        return repository.save(currentUser);
    }

    @Override
    public void clearWatchHistory() {
        User currentUser = this.getCurrentUser();
        currentUser.clearWatchHistory();
        repository.save(currentUser);
    }

    @Override
    public void addToWatchLater(String videoId) {
        User currentUser = this.getCurrentUser();
        History history = new History();
        history.setVideoId(videoId);
        history.setAddedOn(LocalDateTime.now());
        currentUser.addToWatchLater(history);
        repository.save(currentUser);
    }

    @Override
    public Set<History> removeFromWatchLater(String videoId) {
        User currentUser = this.getCurrentUser();
        currentUser.removeFromWatchLater(videoId);
        repository.save(currentUser);
        return currentUser.getWatchLater();
    }

    @Override
    public void clearWatchLater() {
        User currentUser = this.getCurrentUser();
        currentUser.removeAllFromWatchLater();
        repository.save(currentUser);
    }




    // COMMENTS

    @Override
    public void addToLikedComments(String commentId) {
        User currentUser = this.getCurrentUser();
        currentUser.addToLikedComments(commentId);
        repository.save(currentUser);
    }

    @Override
    public void removeFromLikedComments(String commentId) {
        User currentUser = this.getCurrentUser();
        currentUser.removeFromLikedComments(commentId);
        repository.save(currentUser);
    }

    @Override
    public void addToDislikedComments(String commentId) {
        User currentUser = this.getCurrentUser();
        currentUser.addToDislikedComments(commentId);
        repository.save(currentUser);
    }

    @Override
    public void removeFromDislikedComments(String commentId) {
        User currentUser = this.getCurrentUser();
        currentUser.removeFromDislikedComments(commentId);
        repository.save(currentUser);
    }

    @Override
    public boolean ifLikedComment(String commentId) {
        User currentUser = this.getCurrentUser();
        return this.getCurrentUser().getLikedComments().stream().anyMatch((likedComment) -> likedComment.equals(commentId));
    }

    @Override
    public boolean ifDislikedComment(String commentId) {
        return this.getCurrentUser().getDislikedComments().stream().anyMatch((dislikedComment) -> dislikedComment.equals(commentId));
    }

    @Override
    public List<User> getUsersByIds(List<String> userIds) {
        return repository.findAllByIdIn(userIds);
    }
}
