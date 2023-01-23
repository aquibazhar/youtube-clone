import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

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

  constructor(
    private navbarService: NavbarToggleService,
    private videoService: VideoUploadService,
    private userService: UserService,
    private router: Router
  ) {
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
    });
  }

  onShuffle() {
    let randomIndex = Math.floor(Math.random() * this.videoIds.length);
    this.router.navigateByUrl('/watch-video/' + this.videoIds[randomIndex]);
  }

  onClear() {
    this.videoService.removeAllFromLikedVideos().subscribe((data) => {
      console.log(data);
      this.combinedVideoAuthor = [];
      this.playlistCleared.emit(data);
    });
  }

  stopOuterEvent(event: any) {
    event.stopPropagation();
  }
}
