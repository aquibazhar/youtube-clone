import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

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
  videoTags: string[] = ['All'];
  selectedTag: string;

  constructor(
    private videoService: VideoUploadService,
    private userService: UserService,
    private navbarService: NavbarToggleService
  ) {
    this.selectedTag = '';
    this.navbarService.updateData(true, 'side');
  }

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos() {
    this.videoService.getAllVideos().subscribe((data) => {
      this.videos = data;

      this.videos.forEach((video) => {
        this.videoTags = this.videoTags.concat(this.videoTags, video.tags);
        this.userService.getUserById(video.userId).subscribe((data) => {
          this.combinedVideoAuthor.push(new VideoAuthor(video, data));
        });
      });
      this.videoTags = [...new Set(this.videoTags)];
      // this.videoTags.pop();
      // this.videoTags.pop();
      // this.videoTags.push(
      //   'fours',
      //   'fours',
      //   'fours',
      //   'fours',
      //   'fours',
      //   'fours',
      //   'fours',
      //   'fours',
      //   'fours',
      //   'fours',
      //   'fours',

      //   'fours',
      //   'fours',
      //   'fours',

      //   'fours'
      // );
      if (this.videoTags.length > 33) {
        this.videoTags = this.videoTags.slice(0, 33);
      }
      console.log(this.videoTags);
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

  onTagChange(tag: string) {
    if (tag !== 'All') {
      this.selectedTag = tag;
    } else {
      this.selectedTag = '';
    }
  }
}
