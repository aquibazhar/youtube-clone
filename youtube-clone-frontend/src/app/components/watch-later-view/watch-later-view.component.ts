import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { VideoHistory } from 'src/app/models/video-history';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';
import { WarnDialogComponent } from '../warn-dialog/warn-dialog.component';

@Component({
  selector: 'app-watch-later-view',
  templateUrl: './watch-later-view.component.html',
  styleUrls: ['./watch-later-view.component.css'],
})
export class WatchLaterViewComponent implements OnInit {
  imageUrl: string = 'assets/tenz.jpg';
  @Input() currentUser: User = {} as User;
  @Input() userSubscriptions: string[] = [];
  @Input() watchLater: VideoHistory[] = [];
  videos: Video[] = [];
  combinedVideoAuthor: VideoAuthor[] = [];
  @Output() playlistCleared: EventEmitter<string> = new EventEmitter<string>();

  sortType: string = 'dateAddedNewest';
  videoIds: string[] = [];

  constructor(
    private navbarService: NavbarToggleService,
    private videoService: VideoUploadService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.navbarService.updateData(true, 'side');
  }

  ngOnInit(): void {
    this.getVideosByIds();
  }

  getVideosByIds() {
    this.watchLater.forEach((wl) => {
      this.videoIds.push(wl.videoId);
    });
    this.videoService.getVideosByIds(this.videoIds).subscribe((data) => {
      this.videos = data;

      this.videos.forEach((video) => {
        this.userService.getUserById(video.userId).subscribe((data) => {
          this.combinedVideoAuthor.push(new VideoAuthor(video, data));
          if (this.sortType === 'dateAddedNewest') {
            this.sortByDateAddedNewest();
          } else if (this.sortType === 'dateAddedOldest') {
            this.sortByDateAddedOldest();
          } else if (this.sortType === 'mostPopular') {
            this.sortByLikes();
          } else if (this.sortType === 'datePublishedNewest') {
            this.sortByDatePublishedNewest();
          } else {
            this.sortByDatePublishedOldest();
          }
        });
      });
    });
  }

  sortByDateAddedNewest() {
    this.combinedVideoAuthor.sort((a, b) => {
      let addedOnA = this.watchLater.find((vh) => vh.videoId === a.video.id);

      let addedOnB = this.watchLater.find((vh) => vh.videoId === b.video.id);

      if (addedOnA === undefined || addedOnB === undefined) {
        return 0;
      }
      return (
        new Date(addedOnB.addedOn).getTime() -
        new Date(addedOnA.addedOn).getTime()
      );
    });
  }

  sortByDateAddedOldest() {
    this.combinedVideoAuthor.sort((a, b) => {
      let addedOnA: any = this.watchLater.find(
        (vh) => vh.videoId === a.video.id
      );

      let addedOnB: any = this.watchLater.find(
        (vh) => vh.videoId === b.video.id
      );

      if (addedOnA === undefined || addedOnB === undefined) {
        return 0;
      }
      return (
        new Date(addedOnA.addedOn).getTime() -
        new Date(addedOnB.addedOn).getTime()
      );
    });
  }

  sortByLikes() {
    this.combinedVideoAuthor.sort((a, b) => {
      return b.video.views - a.video.views;
    });
  }

  sortByDatePublishedNewest() {
    this.combinedVideoAuthor.sort((a, b) => {
      let date1 = Date.parse(a.video.publishedAt);
      let date2 = Date.parse(b.video.publishedAt);
      return date2 - date1;
    });
  }

  sortByDatePublishedOldest() {
    this.combinedVideoAuthor.sort((a, b) => {
      let date1 = Date.parse(a.video.publishedAt);
      let date2 = Date.parse(b.video.publishedAt);
      return date1 - date2;
    });
  }

  onDelete(videoId: string) {
    this.userService.removeFromWatchLater(videoId).subscribe((data) => {
      this.openSnackBar('Removed from watch later successfully!!!', 'OK');
      this.watchLater = data;
      console.log(this.combinedVideoAuthor);
      if (this.watchLater.length !== 0) {
        this.combinedVideoAuthor = this.combinedVideoAuthor.filter(
          (videoAuthor) => {
            return this.watchLater.some((wl) => {
              return wl.videoId === videoAuthor.video.id;
            });
          }
        );
        console.log(this.combinedVideoAuthor);
      } else {
        this.playlistCleared.emit();
      }
    });
  }

  onShuffle() {
    let randomIndex = Math.floor(Math.random() * this.videoIds.length);
    this.router.navigateByUrl('/watch-video/' + this.videoIds[randomIndex]);
  }

  onClear() {
    this.openDialog();
  }

  stopOuterEvent(event: any) {
    event.stopPropagation();
  }

  dateAddedNewest() {
    this.sortType = 'dateAddedNewest';
    this.getVideosByIds();
    this.combinedVideoAuthor = [];
  }

  dateAddedOldest() {
    this.sortType = 'dateAddedOldest';
    this.getVideosByIds();
    this.combinedVideoAuthor = [];
  }

  mostPopular() {
    this.sortType = 'mostPopular';
    this.getVideosByIds();
    this.combinedVideoAuthor = [];
  }

  datePublishedNewest() {
    this.sortType = 'datePublishedNewest';
    this.getVideosByIds();
    this.combinedVideoAuthor = [];
  }

  datePublishedOldest() {
    this.sortType = 'datePublishedOldest';
    this.getVideosByIds();
    this.combinedVideoAuthor = [];
  }

  drop(event: CdkDragDrop<VideoAuthor[]>) {
    moveItemInArray(
      this.combinedVideoAuthor,
      event.previousIndex,
      event.currentIndex
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(WarnDialogComponent, {
      data: {
        title: 'Remove watched videos?',
        subtitle: 'This will remove all watched videos from Watch later.',
        buttonText: 'Remove',
      },
    });

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.userService.removAllFromWatchLater().subscribe((data) => {
          console.log(data);
          this.combinedVideoAuthor = [];
          this.playlistCleared.emit(data);
        });
      }
    });
  }
}
