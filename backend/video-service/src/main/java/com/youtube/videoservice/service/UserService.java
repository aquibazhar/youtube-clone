package com.youtube.videoservice.service;

import com.youtube.videoservice.model.User;

public interface UserService {
    public User registerUser(String tokenValue);
}
