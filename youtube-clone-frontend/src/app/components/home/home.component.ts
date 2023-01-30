import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  combinedVideoAuthor: VideoAuthor[] = [];
  videoTags: string[] = [];
  selectedTag: string;
  isAuthenticated: boolean;

  constructor(
    private videoService: VideoUploadService,
    private userService: UserService,
    private navbarService: NavbarToggleService,
    private oidcSecurityService: OidcSecurityService,
    private _snackBar: MatSnackBar
  ) {
    this.isAuthenticated = false;
    this.selectedTag = '';
    this.navbarService.updateData(true, 'side');
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
          this.shuffleVideos();
        });
        this.videoTags = this.videoTags.concat(this.videoTags, video.tags);
      });

      this.videoTags = [...new Set(this.videoTags)];
      this.shuffleTags();

      if (this.videoTags.length > 29) {
        this.videoTags = this.videoTags.slice(0, 29);
      }
      this.videoTags.unshift('All');
      console.log(this.videoTags);
    });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  addToWatchLater(videoId: string) {
    this.userService.addToWatchLater(videoId).subscribe((data) => {
      this.openSnackBar(data, 'OK');
    });
  }

  onTagChange(tag: string) {
    if (tag !== 'All') {
      this.selectedTag = tag;
    } else {
      this.selectedTag = '';
    }
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

  shuffleVideos() {
    for (let i = this.combinedVideoAuthor.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.combinedVideoAuthor[i], this.combinedVideoAuthor[j]] = [
        this.combinedVideoAuthor[j],
        this.combinedVideoAuthor[i],
      ];
    }
  }

  shuffleTags() {
    for (let i = this.videoTags.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.videoTags[i], this.videoTags[j]] = [
        this.videoTags[j],
        this.videoTags[i],
      ];
    }
  }
}
