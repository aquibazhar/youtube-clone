import { Component, Input, OnInit } from '@angular/core';
import { CombinedDateTime } from 'src/app/models/combined-date-time';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-subscription-grid-view',
  templateUrl: './subscription-grid-view.component.html',
  styleUrls: ['./subscription-grid-view.component.css'],
})
export class SubscriptionGridViewComponent implements OnInit {
  @Input() userSubscriptions: string[] = [];
  videos: Video[] = [];
  combinedVideoAuthor: VideoAuthor[] = [];
  dataFetched: boolean;
  publishedAt: string[] = [];

  constructor(private videoService: VideoUploadService) {
    this.dataFetched = false;
  }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
    this.videoService
      .getVideosByUserIds(this.userSubscriptions)
      .subscribe((data) => {
        this.videos = data;
        this.videos.forEach((video) => {
          this.publishedAt.push(video.publishedAt);
          this.sortPublishedAt();

          this.dataFetched = true;
        });
        this.publishedAt = [
          ...new Set(
            this.publishedAt.map((publishedAt) => publishedAt.slice(0, 10))
          ),
        ];
      });
  }

  sortByDatePublishedNewest() {
    this.combinedVideoAuthor.sort((a, b) => {
      let date1 = Date.parse(a.video.publishedAt);
      let date2 = Date.parse(b.video.publishedAt);
      return date2 - date1;
    });
  }

  sortPublishedAt() {
    this.publishedAt.sort((a, b) => {
      let date1 = Date.parse(a);
      let date2 = Date.parse(b);
      return date2 - date1;
    });
  }
}
