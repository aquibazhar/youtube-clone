import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
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

  currentUser: User = {} as User;

  videoAuthor: User = {} as User;

  subscription!: Subscription;

  currentUserId: string;

  videoIdAvailable: boolean;
  sameAuthorViewer: boolean;

  isAuthenticated: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoUploadService,
    private userService: UserService,
    private navbarService: NavbarToggleService,
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
    private _snackBar: MatSnackBar
  ) {
    this.isAuthenticated = false;
    this.sameAuthorViewer = false;
    this.videoIdAvailable = false;
    this.videoAvailable = false;
    const userId = localStorage.getItem('userId');
    this.currentUserId = userId !== null ? userId : '';
    this.userService.getUserById(this.currentUserId).subscribe((data) => {
      this.currentUser = data;
    });
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.getVideoById();

    this.navbarService.updateData(false, 'over');
  }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.checkIfCurrentUserLiked();
          this.checkIfCurrentUserDisliked();
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.videoId =
          this.activatedRoute.snapshot.params['videoId'].toLowerCase();

        this.sameAuthorViewer = false;
        this.getVideoById();
        if (this.isAuthenticated) {
          this.checkIfCurrentUserLiked();
          this.checkIfCurrentUserDisliked();
        }
      }
    });
  }

  onUrlChange(newVideoId: string) {
    if (newVideoId !== this.videoId) {
      this.videoAvailable = false;
      this.router.navigateByUrl('/watch-video/' + newVideoId);
    }
  }

  onLike() {
    if (this.isAuthenticated) {
      this.videoService.likeVideo(this.videoId).subscribe((data) => {
        this.videoDetails = data;
        this.checkIfCurrentUserLiked();
        this.checkIfCurrentUserDisliked();
      });
    }
  }

  onDislike() {
    if (this.isAuthenticated) {
      this.videoService.dislikeVideo(this.videoId).subscribe((data) => {
        this.videoDetails = data;
        this.checkIfCurrentUserLiked();
        this.checkIfCurrentUserDisliked();
      });
    }
  }

  onSubscribe() {
    if (this.isAuthenticated) {
      this.userService
        .subscribeToUser(this.videoDetails.userId)
        .subscribe((data) => {
          this.getVideoAuthorDetails(this.videoDetails.userId);
        });
    }
  }

  onUnsubscribe() {
    if (this.isAuthenticated) {
      this.userService
        .unsubscribeFromuser(this.videoDetails.userId)
        .subscribe((data) => {
          this.getVideoAuthorDetails(this.videoDetails.userId);
        });
    }
  }

  getVideoById() {
    this.videoService.getVideoDetails(this.videoId).subscribe((data) => {
      this.videoDetails = data;
      this.videoAvailable = true;
      if (this.videoDetails.userId === this.currentUserId) {
        this.sameAuthorViewer = true;
      }
      this.getVideoAuthorDetails(data.userId);
    });
  }

  getVideoAuthorDetails(userId: string) {
    this.userService.getUserById(userId).subscribe((data) => {
      this.videoAuthor = data;
      this.videoSubscribers = this.videoAuthor.subscribers.length;
      this.checkIfUserIsSubscribed();
    });
  }

  getUserById() {
    this.userService.getUserById(this.currentUser.id).subscribe((data) => {
      this.currentUser = data;
    });
  }

  checkIfCurrentUserLiked() {
    this.videoService.hasUserLiked(this.videoId).subscribe((data) => {
      this.likeFlag = data;
    });
  }

  checkIfCurrentUserDisliked() {
    this.videoService.hasUserDisliked(this.videoId).subscribe((data) => {
      this.dislikeFlag = data;
    });
  }

  checkIfUserIsSubscribed() {
    this.subscribed = this.videoAuthor.subscribers.includes(
      this.currentUser.id
    );
  }

  addToWatchLater() {
    this.userService.addToWatchLater(this.videoId).subscribe((data) => {
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
