package com.youtube.videoservice.service;

import com.youtube.videoservice.model.User;

public interface UserService {
    public User registerUser(String tokenValue);

    public User getCurrentUser();

    public void addToLikedVideos(String videoId);

    public void removeFromLikedVideos(String videoId);

    public void addToDislikedVideos(String videoId);

    public void removeFromDislikedVideos(String videoId);

    public boolean ifLikedVideo(String videoId);

    public boolean ifDislikedVideo(String videoId);
}
