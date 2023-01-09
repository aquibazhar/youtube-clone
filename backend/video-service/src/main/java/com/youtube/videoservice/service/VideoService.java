package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.VideoDto;
import com.youtube.videoservice.model.Video;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface VideoService {
    public Video saveVideo(MultipartFile file) throws IOException;

    public Optional<Video> getVideoByTitle(String title);

    public Optional<Video> getVideoById(String id);

    public Video updateVideo(VideoDto videoDto);

    public String saveThumbnail(MultipartFile file, String videoId)throws IOException;

    public Video likeVideo(String videoId);

    public Video dislikeVideo(String videoId);
}
