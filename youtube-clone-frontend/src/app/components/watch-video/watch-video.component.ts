import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css'],
})
export class WatchVideoComponent implements OnInit {
  videoId: string = '';
  subscribed: boolean = false;

  likeFlag: boolean;
  dislikeFlag: boolean;

  videoAvailable: boolean = false;

  videoDetails = {} as Video;

  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoUploadService,
    private userService: UserService
  ) {
    const userJson = localStorage.getItem('user');
    this.user = userJson !== null ? JSON.parse(userJson) : {};
    console.log(this.user);
    this.likeFlag = false;
    this.dislikeFlag = false;
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideoDetails(this.videoId).subscribe((data) => {
      this.videoDetails = data;
      this.videoAvailable = true;
    });
  }

  ngOnInit(): void {}

  onLike() {
    if (this.likeFlag && !this.dislikeFlag) {
      this.likeFlag = false;
    } else if (!this.likeFlag && this.dislikeFlag) {
      this.likeFlag = true;
      this.dislikeFlag = false;
    } else {
      this.likeFlag = !this.likeFlag;
    }
    this.videoService.likeVideo(this.videoId).subscribe((data) => {
      this.videoDetails = data;
    });
  }

  onDislike() {
    if (!this.likeFlag && this.dislikeFlag) {
      this.dislikeFlag = false;
    } else if (this.likeFlag && !this.dislikeFlag) {
      this.likeFlag = false;
      this.dislikeFlag = true;
    } else {
      this.dislikeFlag = !this.dislikeFlag;
    }
    this.videoService.dislikeVideo(this.videoId).subscribe((data) => {
      this.videoDetails = data;
    });
  }

  onSubscribe() {
    this.userService
      .subscribeToUser(this.videoDetails.userId)
      .subscribe((data) => console.log(data));
  }

  onUnsubscribe() {
    this.userService
      .unsubscribeFromuser(this.videoDetails.userId)
      .subscribe((data) => console.log(data));
  }
}
