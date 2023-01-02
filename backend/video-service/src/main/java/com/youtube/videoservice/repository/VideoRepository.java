package com.youtube.videoservice.repository;

import com.youtube.videoservice.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VideoRepository extends MongoRepository<Video, String> {
    Optional<Video> findByTitle(String title);
}
