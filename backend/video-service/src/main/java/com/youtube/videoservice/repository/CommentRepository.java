package com.youtube.videoservice.repository;

import com.youtube.videoservice.model.Comment;
import com.youtube.videoservice.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByVideoId(String videoId);
}
