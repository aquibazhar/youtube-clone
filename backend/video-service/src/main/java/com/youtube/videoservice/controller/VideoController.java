package com.youtube.videoservice.controller;

import com.youtube.videoservice.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/video")
public class VideoController {

    @Autowired
    private VideoService service;

    @PostMapping({"", "/"})
    public ResponseEntity<String> saveVideo(@RequestParam("video") MultipartFile file) throws IOException {
        String response = service.saveVideo(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{title}")
    public ResponseEntity<?> getVideoByTitle(@PathVariable String title) throws IOException {
        byte[] video = service.getVideoByTitle(title);
        if (video == null || video.length == 0)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).contentType(MediaType.valueOf("video/mp4")).body(video);
        return ResponseEntity.status(HttpStatus.FOUND).contentType(MediaType.valueOf("video/mp4")).body(video);
    }
}
