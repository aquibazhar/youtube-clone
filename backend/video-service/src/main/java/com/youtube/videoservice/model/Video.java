package com.youtube.videoservice.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
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
    private String thumbnailId;
    private ArrayList<Comment> comments;
    private String type;
    private String url;
}
