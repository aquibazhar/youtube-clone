import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CombinedDateTime } from 'src/app/models/combined-date-time';
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
  @Input() searchInput: string = '';
  currentUser: User = {} as User;
  currentUserId: string;
  videoHistory: VideoHistory[] = [];

  videos: Video[] = [];
  uniqueDates: string[] = [];
  dataFetched: boolean;
  combinedDateTime: CombinedDateTime[] = [];

  // combinedVideoAuthor: VideoAuthor[] = [];

  constructor(
    private userService: UserService,
    private videoService: VideoUploadService,
    private _snackBar: MatSnackBar
  ) {
    this.dataFetched = false;
    const userId = localStorage.getItem('userId');
    this.currentUserId = userId !== null ? userId : '';
    this.getUserHistory();
  }

  ngOnInit(): void {}

  getUserHistory() {
    this.userService.getUserById(this.currentUserId).subscribe((data) => {
      this.currentUser = data;
      this.videoHistory = data.videoHistory;
      console.log(this.videoHistory);

      // we extract each addedOn property from videoHistory
      // then make a set from all the values which remove the duplicates
      // then finally convert it back to an array using ...(the spread operator)
      this.uniqueDates = [
        ...new Set(
          this.videoHistory.map((videoHistory) =>
            videoHistory.addedOn.slice(0, 10)
          )
        ),
      ];

      this.uniqueDates.sort(function (a, b) {
        return new Date(b).getTime() - new Date(a).getTime();
      });

      console.log(this.uniqueDates);

      this.uniqueDates.forEach((uniqueDate) => {
        let dateAndTime: VideoHistory[] = [];
        this.videoHistory.forEach((history) => {
          if (uniqueDate.includes(history.addedOn.slice(0, 10))) {
            dateAndTime.push(history);
          }
        });
        this.combinedDateTime.push(
          new CombinedDateTime(uniqueDate, dateAndTime)
        );
      });

      this.dataFetched = true;
    });
  }

  videoRemoved(videoId: string) {
    this.userService.removeVideoFromHistory(videoId).subscribe((data) => {
      this.openSnackBar(data, 'OK');
      this.dataFetched = false;
      this.videoHistory = [];
      this.combinedDateTime = [];
      this.uniqueDates = [];
      this.videoHistory = [];
      this.getUserHistory();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }
}
