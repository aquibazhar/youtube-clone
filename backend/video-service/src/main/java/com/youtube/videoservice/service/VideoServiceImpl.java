package com.youtube.videoservice.service;

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
    public String saveVideo(MultipartFile file) throws IOException {
        String filePath = FILE_PATH + file.getOriginalFilename();
        Video video = repository.save(Video.builder()
                .title(file.getOriginalFilename())
                .type(file.getContentType())
                .videoPath(filePath).build());

        file.transferTo(new File(filePath));

        if (video != null)
            return "Video Uploaded Successfully: " + filePath;
        return null;
    }

    @Override
    public byte[] getVideoByTitle(String title) throws IOException {
        Optional<Video> videoOptional = repository.findByTitle(title);
        String videoPath = videoOptional.get().getVideoPath();

        byte[] file = Files.readAllBytes(new File(videoPath).toPath());

        return file;
    }
}
