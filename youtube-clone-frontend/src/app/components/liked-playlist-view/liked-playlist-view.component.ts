import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';
import { WarnDialogComponent } from '../warn-dialog/warn-dialog.component';

@Component({
  selector: 'app-liked-playlist-view',
  templateUrl: './liked-playlist-view.component.html',
  styleUrls: ['./liked-playlist-view.component.css'],
})
export class LikedPlaylistViewComponent implements OnInit {
  imageUrl: string = 'assets/tenz.jpg';
  @Input() currentUser: User = {} as User;
  @Input() userSubscriptions: string[] = [];
  @Input() videoIds: string[] = [];
  videos: Video[] = [];
  combinedVideoAuthor: VideoAuthor[] = [];
  @Output() playlistCleared: EventEmitter<string> = new EventEmitter<string>();
  confirmation: boolean;

  constructor(
    private navbarService: NavbarToggleService,
    private videoService: VideoUploadService,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.confirmation = false;
    this.navbarService.updateData(true, 'side');
  }

  ngOnInit(): void {
    this.getVideosByIds();
  }

  getVideosByIds() {
    this.videoService.getVideosByIds(this.videoIds).subscribe((data) => {
      this.videos = data;
      this.videos.forEach((video) => {
        this.userService.getUserById(video.userId).subscribe((data) => {
          this.combinedVideoAuthor.push(new VideoAuthor(video, data));
        });
      });
    });
  }

  onDelete(videoId: string) {
    this.videoService.likeVideo(videoId).subscribe((updatedVideo) => {
      this.combinedVideoAuthor = [];
      this.videoIds = this.videoIds.filter((id) => id !== videoId);
      this.getVideosByIds();
      this.openSnackBar(
        'Video removed from liked videos successfully!!!',
        'OK'
      );
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

  addToWatchLater(videoId: string) {
    this.userService.addToWatchLater(videoId).subscribe((data) => {
      this.openSnackBar(data, 'OK');
    });
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
        title: 'Remove Liked videos?',
        subtitle: 'This will remove all videos from Liked videos.',
        buttonText: 'Remove',
      },
    });

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.videoService.removeAllFromLikedVideos().subscribe((data) => {
          this.combinedVideoAuthor = [];
          this.playlistCleared.emit(data);
        });
      }
    });
  }
}
