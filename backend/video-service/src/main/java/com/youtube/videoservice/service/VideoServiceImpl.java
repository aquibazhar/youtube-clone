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

    private final String FILE_PATH = Paths.get("src/main/resources/static/videos").toAbsolutePath().toString() + File.separator;

    @Override
    public Video saveVideo(MultipartFile file) throws IOException {
        String filePath = FILE_PATH + file.getOriginalFilename();
        Video video = new Video();
        video.setTitle(file.getOriginalFilename());
        video.setType(file.getContentType());
        video.setVideoPath(filePath);
        Video savedVideo = repository.save(video);
        file.transferTo(new File(filePath));
        return video;
    }

    @Override
    public Optional<Video> getVideoByTitle(String title){
        return repository.findByTitle(title);
    }

    @Override
    public byte[] getVideoContentByTitle(String title) throws IOException {
        Optional<Video> videoOptional = repository.findByTitle(title);
        String videoPath = videoOptional.get().getVideoPath();

        byte[] file = Files.readAllBytes(new File(videoPath).toPath());

        return file;
    }

    @Override
    public Optional<Video> getVideoById(Long id) {
        return repository.findById(id);
    }

    @Override
    public byte[] getVideoContentById(Long id) throws IOException {
        Optional<Video> videoOptional = repository.findById(id);
        String videoPath = videoOptional.get().getVideoPath();
        byte[] file = Files.readAllBytes(new File(videoPath).toPath());
        return file;
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
