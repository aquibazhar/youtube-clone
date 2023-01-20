import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { VideoHistory } from 'src/app/models/video-history';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css'],
})
export class HistoryCardComponent implements OnInit {
  @Input() addedOn: VideoHistory[] = [];
  videos: Video[] = [];
  combinedVideoAuthor: VideoAuthor[] = [];
  @Output() videoRemoved: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private videoService: VideoUploadService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
    this.videoService
      .getVideosFromDate(this.addedOn[0].addedOn)
      .subscribe((data) => {
        this.videos = data;
        this.videos.sort((a, b) => {
          // Find the video history object for video a
          let addedOnA = this.addedOn.find((vh) => vh.videoId === a.id);
          // Find the video history object for video b
          let addedOnB = this.addedOn.find((vh) => vh.videoId === b.id);
          // Compare the addedOn date of video a and b

          // Check if they are undefined
          if (addedOnA === undefined || addedOnB === undefined) {
            return 0;
          }
          return (
            new Date(addedOnB.addedOn).getTime() -
            new Date(addedOnA.addedOn).getTime()
          );
        });
        this.videos.forEach((video) => {
          this.userService.getUserById(video.userId).subscribe((user) => {
            this.combinedVideoAuthor.push(new VideoAuthor(video, user));
            console.log(this.combinedVideoAuthor);
          });
        });
      });
  }

  removeFromHistory(videoId: string) {
    this.combinedVideoAuthor = [];
    this.videos = [];
    this.videoRemoved.emit(videoId);
  }
}
