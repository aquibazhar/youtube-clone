package com.youtube.videoservice.repository;

import com.youtube.videoservice.model.Thumbnail;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ThumbnailRepository extends MongoRepository
        <Thumbnail, String> {
    Optional<Thumbnail> findByName(String name);
}
