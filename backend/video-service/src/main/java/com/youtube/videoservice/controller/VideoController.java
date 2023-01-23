package com.youtube.videoservice.controller;

import com.youtube.videoservice.dto.CommentDto;
import com.youtube.videoservice.dto.VideoDto;
import com.youtube.videoservice.exception.ResourceAlreadyExistsException;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.Comment;
import com.youtube.videoservice.model.Video;
import com.youtube.videoservice.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/video")
public class VideoController {

    @Autowired
    private VideoService service;

    @PostMapping({"", "/"})
    public ResponseEntity<Video> saveVideo(@RequestParam("video") MultipartFile file) throws IOException, ResourceAlreadyExistsException {
        Optional<Video> videoOptional = service.getVideoByTitle(file.getOriginalFilename());
        if (videoOptional.isPresent()) {
            throw new ResourceAlreadyExistsException("A video with this title already exists.");
        }
        Video savedVideo = service.saveVideo(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVideo);
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<Video>> getAllVideos() throws ResourceNotFoundException {
        List<Video> videoList = service.getAllVideos();
        if(videoList.isEmpty())
            throw new ResourceNotFoundException("No videos exist in the database.");
        return ResponseEntity.status(HttpStatus.OK).body(videoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable String id) throws ResourceNotFoundException {
        Video video = service.getVideoDetails(id);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(video);
    }

    @PutMapping({"", "/"})
    public ResponseEntity<?> updateVideoMetaData(@RequestBody VideoDto videoDto) {

        Optional<Video> videoOptional = service.getVideoById(videoDto.getId());
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        Video updatedVideo = service.updateVideo(videoDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedVideo);
    }

    @PostMapping("/thumbnail")
    public ResponseEntity<String> saveThumbnail(@RequestParam("thumbnail") MultipartFile file, @RequestParam("videoId") String videoId) throws IOException {
        String thumbnailUrl = service.saveThumbnail(file, videoId);
        return ResponseEntity.status(HttpStatus.CREATED).body(thumbnailUrl);
    }

    @PostMapping("/like/{videoId}")
    public ResponseEntity<Video> likeVideo(@PathVariable String videoId) {
        Optional<Video> videoOptional = service.getVideoById(videoId);
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        Video updatedVideo = service.likeVideo(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(updatedVideo);
    }

    @PostMapping("/dislike/{videoId}")
    public ResponseEntity<Video> dislikeVideo(@PathVariable String videoId) {
        Optional<Video> videoOptional = service.getVideoById(videoId);
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        Video updatedVideo = service.dislikeVideo(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(updatedVideo);
    }

    @GetMapping("/like/{videoId}")
    public ResponseEntity<Boolean> hasUserLiked(@PathVariable String videoId) {
        Optional<Video> videoOptional = service.getVideoById(videoId);
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        Boolean userLiked = service.userLiked(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(userLiked);
    }

    @GetMapping("/dislike/{videoId}")
    public ResponseEntity<Boolean> hasUserDisliked(@PathVariable String videoId) {
        Optional<Video> videoOptional = service.getVideoById(videoId);
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        Boolean userDisliked = service.userDisliked(videoId);
        return ResponseEntity.status(HttpStatus.OK).body(userDisliked);
    }

    @PostMapping("/playlist")
    public ResponseEntity<List<Video>> getVideosById(@RequestBody List<String> videoIds) {
        List<Video> videoList = service.getVideosByIds(videoIds);
        if (videoList.isEmpty()) {
            throw new ResourceNotFoundException("No Videos present in the playlist.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(videoList);
    }

    @DeleteMapping("/playlist")
    public ResponseEntity<String> removeAllFromLikedVideos() {
        service.removeAllLikedVideos();
        return ResponseEntity.status(HttpStatus.OK).body("Everything from the Liked Videos playlist removed successfully!!!");
    }

    @GetMapping("/history/{date}")
    public ResponseEntity<List<Video>> getVideosFromDate(@PathVariable String date) {
        LocalDateTime addedOn = LocalDateTime.parse(date);
        List<Video> videoList = service.getVideosByDate(addedOn);
        if (videoList.isEmpty()) {
            throw new ResourceNotFoundException("No Videos were watched on this date.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(videoList);
    }


}
