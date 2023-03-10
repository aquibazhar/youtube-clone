package com.youtube.videoservice.service;

import com.youtube.videoservice.model.History;
import com.youtube.videoservice.model.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserService {
    public User registerUser(String tokenValue);

    public User getCurrentUser();

    public void addToLikedVideos(String videoId);

    public void removeFromLikedVideos(String videoId);

    public void addToDislikedVideos(String videoId);

    public void removeFromDislikedVideos(String videoId);

    public boolean ifLikedVideo(String videoId);

    public boolean ifDislikedVideo(String videoId);

    public void addToLikedComments(String commentId);

    public void removeFromLikedComments(String commentId);

    public void addToDislikedComments(String commentId);

    public void removeFromDislikedComments(String commentId);

    public boolean ifLikedComment(String commentId);

    public boolean ifDislikedComment(String commentId);

    public void addToHistory(History history);

    public void subscribeUser(String userId);

    public void unsubscribeUser(String userId);

    public Set<History> getUserHistory(String userId);

    public Optional<User> getUserById(String userId);


    public void removeFromWatchHistory(String videoId);

    public User togglePauseHistory();

    public void clearWatchHistory();

    public void addToWatchLater(String videoId);

    public Set<History> removeFromWatchLater(String videoId);

    public void clearWatchLater();

    public List<User> getUsersByIds(List<String> userIds);
}
