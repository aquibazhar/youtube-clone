package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.CommentDto;
import com.youtube.videoservice.dto.VideoDto;
import com.youtube.videoservice.model.Comment;
import com.youtube.videoservice.model.Video;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VideoService {
    public Video saveVideo(MultipartFile file) throws IOException;

    public Optional<Video> getVideoByTitle(String title);

    public List<Video> getAllVideos();

    public Optional<Video> getVideoById(String id);

    public Video updateVideo(VideoDto videoDto);

    public String saveThumbnail(MultipartFile file, String videoId) throws IOException;

    public Video likeVideo(String videoId);

    public Video dislikeVideo(String videoId);

    public Video getVideoDetails(String id);

    public void incrementViewCount(Video video);

    public Boolean userLiked(String videoId);

    public Boolean userDisliked(String videoId);

    public List<Video> getVideosByIds(List<String> videoIds);

    public void removeAllLikedVideos();

   public List<Video> getVideosByDate(LocalDateTime addedOn);

    public List<Video> getVideosByUserIds(List<String> userIds);
}
