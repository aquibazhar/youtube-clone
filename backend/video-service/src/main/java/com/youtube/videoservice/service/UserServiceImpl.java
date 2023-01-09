package com.youtube.videoservice.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youtube.videoservice.dto.UserDto;
import com.youtube.videoservice.model.User;
import com.youtube.videoservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

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
        try{
            HttpResponse<String> responseString = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            String body = responseString.body();

            ObjectMapper objectMapper = new ObjectMapper();
            // Here we configure that in case response body contains more fields than we expected objectMapper won't fail
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            UserDto userDto= objectMapper.readValue(body, UserDto.class);
            User user = new User();
            user.setFirstName(userDto.getGivenName());
            user.setLastName(userDto.getFamilyName());
            user.setFullName(userDto.getName());
            user.setSub(userDto.getSub());
            user.setEmailAddress(userDto.getEmail());
            user.setPicture(userDto.getPicture());
            savedUser = repository.save(user);
        }catch(Exception e){
            throw new RuntimeException("An exception occurred while registering the user.", e);
        }

        return savedUser;
    }
}
