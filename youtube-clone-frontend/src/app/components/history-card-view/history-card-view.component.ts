import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { VideoHistory } from 'src/app/models/video-history';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-history-card-view',
  templateUrl: './history-card-view.component.html',
  styleUrls: ['./history-card-view.component.css'],
})
export class HistoryCardViewComponent implements OnInit {
  currentUser: User = {} as User;
  currentUserId: string;
  videoHistory: VideoHistory[] = [];
  videoIds: string[] = [];
  videos: Video[] = [];
  uniqueDates: string[] = [];

  // combinedVideoAuthor: VideoAuthor[] = [];

  constructor(
    private userService: UserService,
    private videoService: VideoUploadService
  ) {
    const userId = localStorage.getItem('userId');
    this.currentUserId = userId !== null ? userId : '';
    this.userService.getUserById(this.currentUserId).subscribe((data) => {
      this.currentUser = data;
      this.videoHistory = data.videoHistory;
      console.log(this.videoHistory);
      this.videoHistory.forEach((videoHistory) => {
        this.videoIds.push(videoHistory.videoId);
      });

      // we extract each addedOn property from videoHistory
      // then make a set from all the values which remove the duplicates
      // then finally convert it back to an array using ...(the spread operator)
      this.uniqueDates = [
        ...new Set(
          this.videoHistory.map((videoHistory) => videoHistory.addedOn)
        ),
      ];

      console.log(this.uniqueDates.length);

      this.getVideosByIds();
    });
  }

  ngOnInit(): void {}

  getVideosByIds() {
    this.videoService.getVideosByIds(this.videoIds).subscribe((data) => {
      this.videos = data;
    });
  }
}
