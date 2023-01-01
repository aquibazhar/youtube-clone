package com.youtube.videoservice.dto;


import lombok.*;


import java.util.HashSet;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VideoDto {
    private Long id;
    private String title;
    private String description;
//    private Long userId;
    private HashSet<String> tags;
    private String videoStatus;
}
