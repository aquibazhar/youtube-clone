import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-subscription-list-view',
  templateUrl: './subscription-list-view.component.html',
  styleUrls: ['./subscription-list-view.component.css'],
})
export class SubscriptionListViewComponent implements OnInit {
  @Input() userSubscriptions: string[] = [];
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
    this.videoService
      .getVideosByUserIds(this.userSubscriptions)
      .subscribe((data) => {
        this.videos = data;
        this.videos.forEach((video) => {
          this.userService.getUserById(video.userId).subscribe((data) => {
            this.combinedVideoAuthor.push(new VideoAuthor(video, data));
            this.sortByDatePublishedNewest();
          });
        });
      });
  }

  sortByDatePublishedNewest() {
    this.combinedVideoAuthor.sort((a, b) => {
      let date1 = Date.parse(a.video.publishedAt);
      let date2 = Date.parse(b.video.publishedAt);
      return date2 - date1;
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
