package com.youtube.videoservice.service;

import com.youtube.videoservice.dto.VideoDto;
import com.youtube.videoservice.exception.ResourceNotFoundException;
import com.youtube.videoservice.model.History;
import com.youtube.videoservice.model.User;
import com.youtube.videoservice.model.Video;
import com.youtube.videoservice.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository repository;

    @Autowired
    private S3Service s3Service;

    @Autowired
    private UserService userService;


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
    public List<Video> getAllVideos() {
        return repository.findAll();
    }


    @Override
    public Optional<Video> getVideoById(String id) {
        return repository.findById(id);
    }

    public Video getVideoDetails(String id) {
        Optional<Video> videoOptional = this.getVideoById(id);

        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");

        Video video = videoOptional.get();

        this.incrementViewCount(video);
        History history = new History();
        history.setVideoId(id);
        history.setAddedOn(LocalDateTime.now());
        userService.addToHistory(history);

        return video;
    }

    @Override
    public void incrementViewCount(Video video) {
        video.incrementViewCount(video.getId());
        repository.save(video);
    }


    @Override
    public Video updateVideo(VideoDto videoDto) {
        Optional<Video> existingVideoOptional = this.getVideoById(videoDto.getId());

        if (existingVideoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");

        Video existingVideo = existingVideoOptional.get();

        existingVideo.setTitle(videoDto.getTitle());
        existingVideo.setDescription(videoDto.getDescription());
        existingVideo.setTags(videoDto.getTags());
        existingVideo.setVideoStatus(videoDto.getVideoStatus());
        existingVideo.setPublishedAt(videoDto.getPublishedAt());
        existingVideo.setUserId(userService.getCurrentUser().getId());

        Video updatedVideo = repository.save(existingVideo);
        return updatedVideo;
    }

    @Override
    public String saveThumbnail(MultipartFile file, String videoId) throws IOException {
        Optional<Video> existingVideoOptional = this.getVideoById(videoId);
        if (existingVideoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");

        Video existingVideo = existingVideoOptional.get();
        String thumbnailUrl = s3Service.uploadFile(file);
        existingVideo.setThumbnailUrl(thumbnailUrl);
        repository.save(existingVideo);
        return thumbnailUrl;
    }

    @Override
    public Video likeVideo(String videoId) {
        // Three cases can happen when like button is pressed
        // 1. Like and Dislike both were 0 for the user, and he liked it.
        // 2. Like was 1 for the user, and he chose to unlike the video.
        // 3. Dislike was 1 and, user chose to Like the video.

        Optional<Video> videoOptional = repository.findById(videoId);
        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        Video video = videoOptional.get();

        if (userService.ifLikedVideo(videoId)) {
            userService.removeFromLikedVideos(videoId);
            video.decrementLikes();
        } else if (userService.ifDislikedVideo(videoId)) {
            userService.removeFromDislikedVideos(videoId);
            userService.addToLikedVideos(videoId);
            video.decrementDislikes();
            video.incrementLikes();
        } else {
            video.incrementLikes();
            userService.addToLikedVideos(videoId);
        }

        Video updatedVideo = repository.save(video);
        return updatedVideo;
    }

    @Override
    public Video dislikeVideo(String videoId) {
        Optional<Video> videoOptional = repository.findById(videoId);
        if (videoOptional.isEmpty())
            throw new ResourceNotFoundException("Video with this ID doesn't exist.");
        Video video = videoOptional.get();

        if (userService.ifDislikedVideo(videoId)) {
            video.decrementDislikes();
            userService.removeFromDislikedVideos(videoId);
        } else if (userService.ifLikedVideo(videoId)) {
            video.decrementLikes();
            userService.removeFromLikedVideos(videoId);
            video.incrementDislikes();
            userService.addToDislikedVideos(videoId);
        } else {
            video.incrementDislikes();
            userService.addToDislikedVideos(videoId);
        }

        Video updatedVideo = repository.save(video);
        return updatedVideo;
    }

    @Override
    public Boolean userLiked(String videoId) {
        return userService.ifLikedVideo(videoId);
    }

    @Override
    public Boolean userDisliked(String videoId) {
        return userService.ifDislikedVideo(videoId);
    }

    @Override
    public List<Video> getVideosByIds(List<String> videoIds) {
        return repository.findAllByIdIn(videoIds);
    }

    @Override
    public void removeAllLikedVideos() {
        User currentUser = userService.getCurrentUser();

        List<String> likedVideos = new ArrayList<>(currentUser.getLikedVideos());
        // 1) Run likeVideo for every videoId in getLikedVideos()
        //    because they are already liked, this will remove them from liked videos and decrement likes as well.

        for(String videoId: likedVideos){
            this.likeVideo(videoId);
        }
    }

    @Override
    public List<Video> getVideosFromHistoryByDate(LocalDateTime addedOn) {
        Set<History> videoHistory = userService.getCurrentUser().getVideoHistory();
        List<String> videoIds = new ArrayList<>();
        for(History h: videoHistory) {
            LocalDate addedOnDate = h.getAddedOn().toLocalDate();
            if (addedOnDate.isEqual(addedOn.toLocalDate())) {
                videoIds.add(h.getVideoId());
            }
        }
        return this.getVideosByIds(videoIds);
    }

    @Override
    public List<Video> getVideosByUserIds(List<String> userIds) {
        return repository.findByUserIdIn(userIds);
    }

    @Override
    public List<Video> getVideosByPublishedAt(String date) {
        LocalDateTime start = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd")).atStartOfDay();
        LocalDateTime end = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd")).atTime(LocalTime.MAX);
        return repository.findByPublishedAtBetween(start, end);
    }
}
