package com.youtube.videoservice.repository;

import com.youtube.videoservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    public Optional<User> findBySub(String sub);
    List<User> findAllByIdIn(List<String> id);
}
