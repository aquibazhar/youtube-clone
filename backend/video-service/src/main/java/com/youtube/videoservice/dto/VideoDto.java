package com.youtube.videoservice.dto;


import lombok.*;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VideoDto {
    private String id;
    private String title;
    private String description;
    private HashSet<String> tags;
    private String url;
    private String videoStatus;
    private String thumbnailUrl;
    private Date date;
}
