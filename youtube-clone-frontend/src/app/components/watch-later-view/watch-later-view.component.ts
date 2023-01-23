import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { VideoHistory } from 'src/app/models/video-history';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

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
    private router: Router
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
      let addedOnA = this.watchLater.find((vh) => vh.videoId === a.video.id);

      let addedOnB = this.watchLater.find((vh) => vh.videoId === b.video.id);

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
    this.videoService
      .removeAllFromLikedVideos(this.currentUser.id)
      .subscribe((data) => {
        console.log(data);
        this.combinedVideoAuthor = [];
        this.playlistCleared.emit(data);
      });
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
}
