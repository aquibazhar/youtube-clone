package com.youtube.videoservice.controller;

import com.youtube.videoservice.exception.ResourceAlreadyExistsException;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.Thumbnail;
import com.youtube.videoservice.service.ThumbnailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/thumbnail")
@CrossOrigin(origins = "http://localhost:4200")
public class ThumbnailController {

    @Autowired
    private ThumbnailService service;

    @PostMapping("/{videoId}")
    public ResponseEntity<Thumbnail> saveThumbnail(@RequestParam("thumbnail") MultipartFile file, @PathVariable Long videoId) throws IOException, ResourceAlreadyExistsException {
        Optional<Thumbnail> thumbnailOptional = service.getThumbnailByName(file.getOriginalFilename());
        if (thumbnailOptional.isPresent()) {
            throw new ResourceAlreadyExistsException("A thumbnail with this name already exists.");
        }
        Thumbnail savedThumbnail = service.saveThumbnail(file, videoId);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedThumbnail);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getThumbnailById(@PathVariable Long id) throws IOException, ResourceNotFoundException {
        Optional<Thumbnail> thumbnailOptional = service.getThumbnailById(id);
        if (thumbnailOptional.isEmpty()) {
            throw new ResourceNotFoundException("Thumbnail with this ID doesn't exist.");
        }
        byte[] thumbnail = service.getThumbnailContentById(id);
        return ResponseEntity.status(HttpStatus.FOUND).contentType(MediaType.valueOf("images/jpeg")).body(thumbnail);
    }
}
