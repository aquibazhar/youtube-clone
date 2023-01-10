package com.youtube.videoservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @MongoId
    private String id;
    private String text;
    private String authorId;
    private Integer likes;
    private Integer dislikes;
}
