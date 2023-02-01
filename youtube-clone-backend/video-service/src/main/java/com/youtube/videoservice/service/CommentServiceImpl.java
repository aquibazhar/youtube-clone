package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.CommentDto;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.Comment;
import com.youtube.videoservice.model.Video;
import com.youtube.videoservice.repository.CommentRepository;
import com.youtube.videoservice.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserService userService;

    @Override
    public Comment addComment(CommentDto commentDto) {
        Optional<Video> videoOptional = videoRepository.findById(commentDto.getVideoId());
        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        Video video = videoOptional.get();

        Comment comment = new Comment();
        comment.setText(commentDto.getText());
        comment.setAuthorId(commentDto.getAuthorId());
        comment.setPublishedAt(commentDto.getPublishedAt());
        comment.setVideoId(commentDto.getVideoId());

        video.addComment(commentDto.getVideoId());
        videoRepository.save(video);
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getAllComments(String videoId) {
        return commentRepository.findByVideoId(videoId);
    }

    @Override
    public Comment likeComment(String commentId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);

        if (commentOptional.isEmpty())
            throw new ResourceNotFoundException("Comment with this ID doesn't exist");
        Comment comment = commentOptional.get();
        if (userService.ifLikedComment(commentId)) {
            userService.removeFromLikedComments(commentId);
            comment.decrementLikes();
        } else if (userService.ifDislikedComment(commentId)) {
            userService.removeFromDislikedComments(commentId);
            comment.decrementDislikes();
            userService.addToLikedComments(commentId);
            comment.incrementLikes();
        } else {
            comment.incrementLikes();
            userService.addToLikedComments(commentId);
        }

        return commentRepository.save(comment);
    }

    @Override
    public Comment dislikeComment(String commentId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);

        if (commentOptional.isEmpty())
            throw new ResourceNotFoundException("Comment with this ID doesn't exist");
        Comment comment = commentOptional.get();
        if (userService.ifDislikedComment(commentId)) {
            userService.removeFromDislikedComments(commentId);
            comment.decrementDislikes();
        } else if (userService.ifLikedComment(commentId)) {
            userService.removeFromLikedComments(commentId);
            comment.decrementLikes();
            userService.addToDislikedComments(commentId);
            comment.incrementDislikes();
        } else {
            comment.incrementDislikes();
            userService.addToDislikedComments(commentId);
        }

        return commentRepository.save(comment);
    }

    @Override
    public Optional<Comment> getCommentById(String commentId) {
        return commentRepository.findById(commentId);
    }

    @Override
    public Boolean userLiked(String commentId) {
        return userService.ifLikedComment(commentId);
    }

    @Override
    public Boolean userDisliked(String commentId) {
        return userService.ifDislikedComment(commentId);
    }
}
