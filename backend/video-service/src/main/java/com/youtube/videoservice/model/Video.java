package com.youtube.videoservice.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;
import java.util.HashSet;


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
    private Integer likes;
    private Integer dislikes;
    private HashSet<String> tags;
    private String videoStatus;
    private Integer views;
    private String thumbnailUrl;
    private ArrayList<Comment> comments;
    private String url;
}
