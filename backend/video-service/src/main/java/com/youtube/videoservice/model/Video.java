package com.youtube.videoservice.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Video {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private Long userId;
    private Integer likes;
    private Integer dislikes;
    private HashSet<String> tags;
    private String videoStatus;
    private Integer views;
    private Long thumbnailId;
    private ArrayList<Comment> comments;
    private String type;
    private String videoPath;
}
