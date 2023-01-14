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
@RequestMapping("/api/v1/comment")
public class CommentController {

    @Autowired
    private CommentService service;

    @Autowired
    private VideoService videoService;

    @PostMapping({"", "/"})
    public ResponseEntity<Comment> addComment(@RequestBody CommentDto commentDto) {
        Optional<Video> videoOptional = videoService.getVideoById(commentDto.getVideoId());
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        Comment savedComment = service.addComment(commentDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable String videoId) {
        List<Comment> comments = service.getAllComments(videoId);
        if (comments.isEmpty())
            throw new ResourceNotFoundException("There are no comments for this video.");
        return ResponseEntity.status(HttpStatus.OK).body(comments);
    }

    @PostMapping("/like/{commentId}")
    public ResponseEntity<Comment> likeComment(@PathVariable String commentId) {
        Optional<Comment> commentOptional = service.getCommentById(commentId);
        if(commentOptional.isEmpty())
            throw new ResourceNotFoundException("Comment with this ID doesn't exist.");
        Comment updatedComment = service.likeComment(commentId);
        return ResponseEntity.status(HttpStatus.OK).body(updatedComment);
    }

    @PostMapping("/dislike/{commentId}")
    public ResponseEntity<Comment> dislikeComment(@PathVariable String commentId) {
        Optional<Comment> commentOptional = service.getCommentById(commentId);
        if(commentOptional.isEmpty())
            throw new ResourceNotFoundException("Comment with this ID doesn't exist.");
        Comment updatedComment = service.dislikeComment(commentId);
        return ResponseEntity.status(HttpStatus.OK).body(updatedComment);
    }

    @GetMapping("/like/{commentId}")
    public ResponseEntity<Boolean> hasUserLiked(@PathVariable String commentId) {
        Optional<Comment> commentOptional = service.getCommentById(commentId);
        if(commentOptional.isEmpty())
            throw new ResourceNotFoundException("Comment with this ID doesn't exist.");

        Boolean userLiked = service.userLiked(commentId);
        return ResponseEntity.status(HttpStatus.OK).body(userLiked);
    }

    @GetMapping("/dislike/{commentId}")
    public ResponseEntity<Boolean> hasUserDisliked(@PathVariable String commentId) {
        Optional<Comment> commentOptional = service.getCommentById(commentId);
        if(commentOptional.isEmpty())
            throw new ResourceNotFoundException("Comment with this ID doesn't exist.");

        Boolean userLiked = service.userDisliked(commentId);
        return ResponseEntity.status(HttpStatus.OK).body(userLiked);
    }
}
