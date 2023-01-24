import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-subscription-grid-card',
  templateUrl: './subscription-grid-card.component.html',
  styleUrls: ['./subscription-grid-card.component.css'],
})
export class SubscriptionGridCardComponent implements OnInit {
  @Input() publishedAt: string = '';
  @Input() subscriptionsVideos: Video[] = [];
  videos: Video[] = [];
  combinedVideoAuthor: VideoAuthor[] = [];

  constructor(
    private videoService: VideoUploadService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
    this.videoService.getVideosByDate(this.publishedAt).subscribe((data) => {
      this.videos = data;
      this.videos = this.videos.filter((v1) =>
        this.subscriptionsVideos.some((v2) => v2.id === v1.id)
      );
      this.videos.forEach((video) => {
        this.userService.getUserById(video.userId).subscribe((data) => {
          this.combinedVideoAuthor.push(new VideoAuthor(video, data));
        });
      });
      console.log(this.combinedVideoAuthor);
    });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  addToWatchLater(videoId: string) {
    this.userService.addToWatchLater(videoId).subscribe((data) => {
      console.log(data);
    });
  }
}
