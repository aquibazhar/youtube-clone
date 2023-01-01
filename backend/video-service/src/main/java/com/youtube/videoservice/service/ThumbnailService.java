package com.youtube.videoservice.service;

import com.youtube.videoservice.model.Thumbnail;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface ThumbnailService {
    public Thumbnail saveThumbnail(MultipartFile file, Long videoId) throws IOException;

    public Optional<Thumbnail> getThumbnailById(Long id);

    public byte[] getThumbnailContentById(Long id) throws IOException;

    public Optional<Thumbnail> getThumbnailByName(String name);
}
