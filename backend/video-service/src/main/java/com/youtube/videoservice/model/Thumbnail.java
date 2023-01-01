package com.youtube.videoservice.model;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "thumbnail")
public class Thumbnail {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String thumbnailPath;
}
