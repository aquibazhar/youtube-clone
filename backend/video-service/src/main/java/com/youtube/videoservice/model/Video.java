package com.youtube.videoservice.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;
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
    private Long userId;
    private AtomicInteger likes = new AtomicInteger(0);
    private AtomicInteger dislikes = new AtomicInteger(0);
    private HashSet<String> tags;
    private String videoStatus;
    private AtomicInteger views = new AtomicInteger(0);
    private String thumbnailUrl;
    private List<Comment> comments = new CopyOnWriteArrayList<>();
    private String url;

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

    public void addComment(Comment comment) {
        comments.add(comment);
    }
}
