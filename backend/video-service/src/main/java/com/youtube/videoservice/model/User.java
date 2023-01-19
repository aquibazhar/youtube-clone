package com.youtube.videoservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class User {
    @MongoId
    private String id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String emailAddress;
    private String picture;
    private String sub;
    private Set<String> subscribedToUsers = ConcurrentHashMap.newKeySet();
    ;
    private Set<String> subscribers = ConcurrentHashMap.newKeySet();
    ;
    private Set<String> videoHistory = ConcurrentHashMap.newKeySet();
    // To keep it thread safe we used ConcurrentHashMap.newKeySet();
    private Set<String> likedVideos = ConcurrentHashMap.newKeySet();
    private Set<String> dislikedVideos = ConcurrentHashMap.newKeySet();

    private Set<String> likedComments = ConcurrentHashMap.newKeySet();
    private Set<String> dislikedComments = ConcurrentHashMap.newKeySet();

    public void addToLikedVideos(String videoId) {
        likedVideos.add(videoId);
    }

    public void removeFromLikedVideos(String videoId) {
        likedVideos.remove(videoId);
    }

    public void addToDislikedVideos(String videoId) {
        dislikedVideos.add(videoId);
    }

    public void removeFromDislikedVideos(String videoId) {
        dislikedVideos.remove(videoId);
    }

    public void addToLikedComments(String commentId){
        likedComments.add(commentId);
    }

    public void removeFromLikedComments(String commentId){
        likedComments.remove(commentId);
    }

    public void addToDislikedComments(String commentId){
        dislikedComments.add(commentId);
    }

    public void removeFromDislikedComments(String commentId){
        dislikedComments.remove(commentId);
    }

    public void addToHistory(String videoId) {
        videoHistory.add(videoId);
    }

    public void subscribeToUser(String userId) {
        subscribedToUsers.add(userId);
    }

    public void unsubscribeFromUser(String userId) {
        subscribedToUsers.remove(userId);
    }

    public void incrementSubscribers(String userId) {
        subscribers.add(userId);
    }

    public void decrementSubscribers(String userId) {
        subscribers.remove(userId);
    }

    public void removeAllFromLikedVideos(){
        likedVideos.clear();
    }
}
