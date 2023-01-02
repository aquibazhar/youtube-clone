package com.youtube.videoservice.service;

import com.youtube.videoservice.model.Thumbnail;
import com.youtube.videoservice.model.Video;
import com.youtube.videoservice.repository.ThumbnailRepository;
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
public class ThumbnailServiceImpl implements ThumbnailService{

    @Autowired
    private ThumbnailRepository thumbnailRepository;

    @Autowired
    private VideoRepository videoRepository;

    private final String FILE_PATH = Paths.get("src/main/resources/static/thumbnails").toAbsolutePath().toString() + File.separator;

    @Override
    public Thumbnail saveThumbnail(MultipartFile file, String videoId) throws IOException {
        String filePath = FILE_PATH + file.getOriginalFilename();
        Thumbnail thumbnail = new Thumbnail();
        thumbnail.setThumbnailPath(filePath);
        thumbnail.setName(file.getOriginalFilename());
        Thumbnail savedThumbnail = thumbnailRepository.save(thumbnail);
        Video existingVideo = videoRepository.findById(videoId).get();
        existingVideo.setThumbnailId(savedThumbnail.getId());
        videoRepository.save(existingVideo);
        file.transferTo(new File(filePath));
        return savedThumbnail;
    }

    @Override
    public Optional<Thumbnail> getThumbnailById(String id) {
        return thumbnailRepository.findById(id);
    }

    @Override
    public byte[] getThumbnailContentById(String id) throws IOException {
        Optional<Thumbnail> thumbnailOptional = thumbnailRepository.findById(id);
        String thumbnailPath = thumbnailOptional.get().getThumbnailPath();
        byte[] file = Files.readAllBytes(new File(thumbnailPath).toPath());
        return file;
    }

    @Override
    public Optional<Thumbnail> getThumbnailByName(String name) {
        return thumbnailRepository.findByName(name);
    }
}
