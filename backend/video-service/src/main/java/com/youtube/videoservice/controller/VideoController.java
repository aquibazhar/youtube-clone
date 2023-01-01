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
@CrossOrigin(origins = "http://localhost:4200")
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

    @GetMapping("/title/{title}")
    public ResponseEntity<?> getVideoByTitle(@PathVariable String title) throws IOException, ResourceNotFoundException {
        Optional<Video> videoOptional = service.getVideoByTitle(title);
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this title doesn't exist.");
        }
        byte[] video = service.getVideoContentByTitle(title);
        return ResponseEntity.status(HttpStatus.FOUND).contentType(MediaType.valueOf("video/mp4")).body(video);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVideoById(@PathVariable Long id) throws IOException, ResourceNotFoundException {
        Optional<Video> videoOptional = service.getVideoById(id);
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(videoOptional.get());
    }

    @PutMapping({"", "/"})
    public ResponseEntity<?> updateVideoDetails(@RequestBody VideoDto videoDto){

        Optional<Video> videoOptional = service.getVideoById(videoDto.getId());
        if (videoOptional.isEmpty()) {
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        }
        Video updatedVideo =  service.updateVideo(videoDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedVideo);
    }

}
