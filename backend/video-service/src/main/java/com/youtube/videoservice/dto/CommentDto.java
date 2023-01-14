package com.youtube.videoservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDto {
    private String text;
    private String authorId;
    private AtomicInteger likes;
    private AtomicInteger dislikes;
    private LocalDateTime publishedAt;
    private String videoId;
}
