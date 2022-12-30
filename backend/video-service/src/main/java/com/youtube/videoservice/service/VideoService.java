package com.youtube.videoservice.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface VideoService {
    public String saveVideo(MultipartFile file) throws IOException;

    public byte[] getVideoByTitle(String title) throws IOException;
}
