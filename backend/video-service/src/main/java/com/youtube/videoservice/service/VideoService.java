package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.VideoDto;
import com.youtube.videoservice.model.Video;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.Optional;

public interface VideoService {
    public Video saveVideo(MultipartFile file) throws IOException;

    public Optional<Video> getVideoByTitle(String title);

    public byte[] getVideoContentByTitle(String title) throws IOException;

    public Optional<Video> getVideoById(String id);

    public byte[] getVideoContentById(String id) throws IOException;

    public Video updateVideo(VideoDto videoDto);
}
