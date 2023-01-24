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
  @Input() searchInput: string = '';
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
      .getVideosFromVideoHistoryByDate(this.addedOn[0].addedOn)
      .subscribe((data) => {
        this.videos = data;
        this.videos.sort((a, b) => {
          let addedOnA = this.addedOn.find((vh) => vh.videoId === a.id);

          let addedOnB = this.addedOn.find((vh) => vh.videoId === b.id);

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

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  addToWatchLater(videoId: string) {
    this.userService.addToWatchLater(videoId).subscribe((data) => {
      console.log(data);
    });
  }
}
