import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {
  videos: Video[] = [];
  combinedVideoAuthor: VideoAuthor[] = [];
  @Output() urlChange: EventEmitter<string> = new EventEmitter<string>();
  isAuthenticated: boolean;

  constructor(
    private videoService: VideoUploadService,
    private userService: UserService,
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
    private _snackBar: MatSnackBar
  ) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
      },
      (error) => {
        console.log(error);
      }
    );
    this.getAllVideos();
  }

  getAllVideos() {
    this.videoService.getAllVideos().subscribe((data) => {
      this.videos = data;
      this.videos.forEach((video) => {
        this.userService.getUserById(video.userId).subscribe((data) => {
          this.combinedVideoAuthor.push(new VideoAuthor(video, data));
        });
      });
    });
  }

  onClick(videoId: string) {
    this.router.navigateByUrl('/watch-video/' + videoId);
    this.urlChange.emit(videoId);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  addToWatchLater(videoId: string) {
    this.userService.addToWatchLater(videoId).subscribe((data) => {
      this.openSnackBar(data, 'OK');
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }
}
