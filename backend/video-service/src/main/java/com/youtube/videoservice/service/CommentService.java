package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.CommentDto;
import com.youtube.videoservice.model.Comment;

import java.util.List;

public interface CommentService {
    public void addComment(CommentDto commentDto, String videoId);

    public List<Comment> getAllComments(String videoId);
}
