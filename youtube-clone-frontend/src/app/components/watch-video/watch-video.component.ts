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
  videoSubscribers: number = 0;

  likeFlag: boolean = false;
  dislikeFlag: boolean = false;

  videoAvailable: boolean = false;

  videoDetails = {} as Video;

  currentUser: User;

  videoAuthor: User = {} as User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoUploadService,
    private userService: UserService
  ) {
    const userJson = localStorage.getItem('user');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : {};

    this.getUserById();
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.getVideoById();
  }

  ngOnInit(): void {}

  onLike() {
    this.videoService.likeVideo(this.videoId).subscribe((data) => {
      this.getVideoById();
      this.getUserById();
    });
  }

  onDislike() {
    this.videoService.dislikeVideo(this.videoId).subscribe((data) => {
      this.getVideoById();
      this.getUserById();
    });
  }

  onSubscribe() {
    this.userService
      .subscribeToUser(this.videoDetails.userId)
      .subscribe((data) => {
        this.getVideoAuthorDetails();
      });
  }

  onUnsubscribe() {
    this.userService
      .unsubscribeFromuser(this.videoDetails.userId)
      .subscribe((data) => {
        this.getVideoAuthorDetails();
      });
  }

  getVideoById() {
    this.videoService.getVideoDetails(this.videoId).subscribe((data) => {
      this.videoDetails = data;
      this.videoAvailable = true;
      this.getVideoAuthorDetails();
    });
  }

  getVideoAuthorDetails() {
    this.userService.getUserById(this.videoDetails.userId).subscribe((data) => {
      this.videoAuthor = data;
      this.videoSubscribers = this.videoAuthor.subscribers.length;
      this.checkIfUserIsSubscribed();
    });
  }

  getUserById() {
    this.userService.getUserById(this.currentUser.id).subscribe((data) => {
      this.currentUser = data;
      this.checkIfCurrentUserLiked();
      this.checkIfCurrentUserDisliked();
    });
  }

  checkIfCurrentUserLiked() {
    this.likeFlag = this.currentUser.likedVideos.includes(this.videoId);
  }

  checkIfCurrentUserDisliked() {
    this.dislikeFlag = this.dislikeFlag =
      this.currentUser.dislikedVideos.includes(this.videoId);
  }

  checkIfUserIsSubscribed() {
    this.subscribed = this.videoAuthor.subscribers.includes(
      this.currentUser.id
    );
  }
}
