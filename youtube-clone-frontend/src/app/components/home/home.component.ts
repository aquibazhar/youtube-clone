import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  constructor(private videoService: VideoUploadService) {
    this.videoService.getAllVideos().subscribe((data) => {
      this.videos = data;
      console.log(this.videos);
    });
  }

  ngOnInit(): void {}
}
