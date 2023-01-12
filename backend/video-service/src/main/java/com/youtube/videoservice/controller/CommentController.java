package com.youtube.videoservice.controller;

import com.youtube.videoservice.dto.CommentDto;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.Comment;
import com.youtube.videoservice.model.Video;
import com.youtube.videoservice.service.CommentService;
import com.youtube.videoservice.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/comment")
public class CommentController {

    @Autowired
    private CommentService service;

    @Autowired
    private VideoService videoService;

    @PostMapping("/{videoId}")
    public ResponseEntity<String> addComment(@RequestBody CommentDto commentDto, @PathVariable String videoId) {
        Optional<Video> videoOptional = videoService.getVideoById(videoId);
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        service.addComment(commentDto, videoId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Comment added.");
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable String videoId){
        List<Comment> comments = service.getAllComments(videoId);
        if(comments.isEmpty())
            throw new ResourceNotFoundException("There are no comments for this video.");
        return ResponseEntity.status(HttpStatus.OK).body(comments);
    }
}
