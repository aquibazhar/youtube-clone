package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.CommentDto;
import com.youtube.videoservice.dto.VideoDto;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.Comment;
import com.youtube.videoservice.model.Video;
import com.youtube.videoservice.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository repository;

    @Autowired
    private S3Service s3Service;

    @Autowired
    private UserService userService;


    @Override
    public Video saveVideo(MultipartFile file) throws IOException {
        String videoUrl = s3Service.uploadFile(file);
        Video video = new Video();
        video.setUrl(videoUrl);
        Video savedVideo = repository.save(video);
        return video;
    }

    @Override
    public Optional<Video> getVideoByTitle(String title) {
        return repository.findByTitle(title);
    }

    @Override
    public List<Video> getAllVideos() {
        return repository.findAll();
    }


    @Override
    public Optional<Video> getVideoById(String id) {
        return repository.findById(id);
    }

    public Video getVideoDetails(String id) {
        Optional<Video> videoOptional = this.getVideoById(id);

        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");

        Video video = videoOptional.get();

        this.incrementViewCount(video);
        userService.addToHistory(id);

        return video;
    }

    @Override
    public void incrementViewCount(Video video) {
        video.incrementViewCount(video.getId());
        repository.save(video);
    }



    @Override
    public Video updateVideo(VideoDto videoDto) {
        Optional<Video> existingVideoOptional = this.getVideoById(videoDto.getId());

        if (existingVideoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");

        Video existingVideo = existingVideoOptional.get();

        existingVideo.setTitle(videoDto.getTitle());
        existingVideo.setDescription(videoDto.getDescription());
        existingVideo.setTags(videoDto.getTags());
        existingVideo.setVideoStatus(videoDto.getVideoStatus());
        existingVideo.setDate(videoDto.getDate());

        Video updatedVideo = repository.save(existingVideo);
        return updatedVideo;
    }

    @Override
    public String saveThumbnail(MultipartFile file, String videoId) throws IOException {
        Optional<Video> existingVideoOptional = this.getVideoById(videoId);
        if (existingVideoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");

        Video existingVideo = existingVideoOptional.get();
        String thumbnailUrl = s3Service.uploadFile(file);
        existingVideo.setThumbnailUrl(thumbnailUrl);
        repository.save(existingVideo);
        return thumbnailUrl;
    }

    @Override
    public Video likeVideo(String videoId) {
        // Three cases can happen when like button is pressed
        // 1. Like and Dislike both were 0 for the user, and he liked it.
        // 2. Like was 1 for the user, and he chose to unlike the video.
        // 3. Dislike was 1 and, user chose to Like the video.

        Optional<Video> videoOptional = repository.findById(videoId);
        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        Video video = videoOptional.get();

        if (userService.ifLikedVideo(videoId)) {
            userService.removeFromLikedVideos(videoId);
            video.decrementLikes();
        } else if (userService.ifDislikedVideo(videoId)) {
            userService.removeFromDislikedVideos(videoId);
            userService.addToLikedVideos(videoId);
            video.decrementDislikes();
            video.incrementLikes();
        } else {
            video.incrementLikes();
            userService.addToLikedVideos(videoId);
        }

        Video updatedVideo = repository.save(video);
        return updatedVideo;
    }

    @Override
    public Video dislikeVideo(String videoId) {
        Optional<Video> videoOptional = repository.findById(videoId);
        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        Video video = videoOptional.get();

        if (userService.ifDislikedVideo(videoId)) {
            video.decrementDislikes();
            userService.removeFromDislikedVideos(videoId);
        } else if (userService.ifLikedVideo(videoId)) {
            video.decrementLikes();
            userService.removeFromLikedVideos(videoId);
            video.incrementDislikes();
            userService.addToDislikedVideos(videoId);
        } else {
            video.incrementDislikes();
            userService.addToDislikedVideos(videoId);
        }

        Video updatedVideo = repository.save(video);
        return updatedVideo;
    }

    @Override
    public void addComment(CommentDto commentDto, String videoId) {
        Optional<Video> videoOptional = repository.findById(videoId);
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
        Optional<Video> videoOptional = repository.findById(videoId);
        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        Video video = videoOptional.get();
        return video.getComments();
    }


}
