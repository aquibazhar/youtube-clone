package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.VideoDto;
import com.youtube.videoservice.model.Video;
import com.youtube.videoservice.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository repository;

    @Autowired
    private S3Service s3Service;


    @Override
    public Video saveVideo(MultipartFile file) throws IOException {
        String videoUrl = s3Service.uploadFile(file);
        Video video = new Video();
        video.setUrl(videoUrl);
        Video savedVideo = repository.save(video);
        return video;
    }

    @Override
    public Optional<Video> getVideoByTitle(String title) {
        return repository.findByTitle(title);
    }

    @Override
    public byte[] getVideoContentByTitle(String title) throws IOException {
        return null;
    }

    @Override
    public Optional<Video> getVideoById(String id) {
        return repository.findById(id);
    }

    @Override
    public byte[] getVideoContentById(String id) throws IOException {
        return null;
    }

    @Override
    public Video updateVideo(VideoDto videoDto) {
        Video existingVideo = repository.findById(videoDto.getId()).get();
        existingVideo.setTitle(videoDto.getTitle());
        existingVideo.setDescription(videoDto.getDescription());
        existingVideo.setTags(videoDto.getTags());
        existingVideo.setVideoStatus(videoDto.getVideoStatus());

        Video updatedVideo = repository.save(existingVideo);
        return updatedVideo;
    }
}
