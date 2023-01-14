package com.youtube.videoservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Video {
    @MongoId
    private String id;
    private String title;
    private String description;
    private String userId;
    private AtomicInteger likes = new AtomicInteger(0);
    private AtomicInteger dislikes = new AtomicInteger(0);
    private HashSet<String> tags;
    private String videoStatus;
    private AtomicInteger views = new AtomicInteger(0);
    private String thumbnailUrl;
    private List<String> comments = new CopyOnWriteArrayList<>();
    private String url;
    private LocalDateTime publishedAt;

    public void incrementLikes() {
        likes.incrementAndGet();
    }

    public void decrementLikes() {
        likes.decrementAndGet();
    }

    public void incrementDislikes() {
        dislikes.incrementAndGet();
    }

    public void decrementDislikes() {
        dislikes.decrementAndGet();
    }

    public void incrementViewCount(String id) {
        views.incrementAndGet();
    }

    public void addComment(String commentId) {
        comments.add(commentId);
    }
}
