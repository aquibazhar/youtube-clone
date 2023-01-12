package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.CommentDto;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.Comment;
import com.youtube.videoservice.model.Video;
import com.youtube.videoservice.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private VideoRepository videoRepository;
    @Override
    public void addComment(CommentDto commentDto, String videoId) {
        Optional<Video> videoOptional = videoRepository.findById(videoId);
        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        Video video = videoOptional.get();

        Comment comment = new Comment();
        comment.setText(commentDto.getText());
        comment.setAuthorId(commentDto.getAuthorId());

        video.addComment(comment);
    }

    @Override
    public List<Comment> getAllComments(String videoId) {
        Optional<Video> videoOptional = videoRepository.findById(videoId);
        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        Video video = videoOptional.get();
        return video.getComments();
    }
}
