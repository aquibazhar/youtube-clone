package com.youtube.videoservice.service;

import com.youtube.videoservice.model.Thumbnail;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface ThumbnailService {
    public Thumbnail saveThumbnail(MultipartFile file, String videoId) throws IOException;

    public Optional<Thumbnail> getThumbnailById(String id);

    public byte[] getThumbnailContentById(String id) throws IOException;

    public Optional<Thumbnail> getThumbnailByName(String name);
}
