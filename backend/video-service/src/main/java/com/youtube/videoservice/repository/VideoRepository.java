package com.youtube.videoservice.repository;

import com.youtube.videoservice.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, Long> {
    Optional<Video> findByTitle(String title);
}
