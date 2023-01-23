package com.youtube.videoservice.repository;

import com.youtube.videoservice.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends MongoRepository<Video, String> {
    Optional<Video> findByTitle(String title);

    List<Video> findAllByIdIn(List<String> id);

    List<Video> findByUserIdIn(List<String> userIds);
}
