package com.youtube.videoservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDto {
    private String text;
    private String authorId;
    private Integer likes;
    private Integer dislikes;
    private LocalDateTime publishedAt;
}
