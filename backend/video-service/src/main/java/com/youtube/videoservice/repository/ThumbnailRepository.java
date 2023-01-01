package com.youtube.videoservice.repository;

import com.youtube.videoservice.model.Thumbnail;
import com.youtube.videoservice.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThumbnailRepository extends JpaRepository<Thumbnail, Long> {
    Optional<Thumbnail> findByName(String name);
}
