package com.youtube.videoservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Comment {
    @MongoId
    private String id;
    private String text;
    private String authorId;
    private AtomicInteger likes = new AtomicInteger(0);
    private AtomicInteger dislikes = new AtomicInteger(0);
    private LocalDateTime publishedAt;
    private String videoId;

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
}
