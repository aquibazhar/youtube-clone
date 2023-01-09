package com.youtube.videoservice.controller;

import com.youtube.videoservice.dto.VideoDto;
import com.youtube.videoservice.exception.ResourceAlreadyExistsException;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.Video;
import com.youtube.videoservice.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable String id) throws ResourceNotFoundException {
        Optional<Video> videoOptional = service.getVideoById(id);
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(videoOptional.get());
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

}
