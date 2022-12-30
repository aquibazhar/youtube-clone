package com.youtube.videoservice.model;

import lombok.*;

import javax.persistence.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Video {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String type;
    private String videoPath;
}
