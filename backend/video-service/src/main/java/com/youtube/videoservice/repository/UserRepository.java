package com.youtube.videoservice.repository;

import com.youtube.videoservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
