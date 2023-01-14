package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.CommentDto;
import com.youtube.videoservice.model.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    public Comment addComment(CommentDto commentDto);

    public List<Comment> getAllComments(String videoId);

    public Comment likeComment(String commentId);

    public Comment dislikeComment(String commentId);

    public Optional<Comment> getCommentById(String commentId);

    public Boolean userLiked(String commentId);

    public Boolean userDisliked(String commentId);
}
