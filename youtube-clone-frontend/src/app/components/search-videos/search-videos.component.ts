import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { VideoAuthor } from 'src/app/models/video-author';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-search-videos',
  templateUrl: './search-videos.component.html',
  styleUrls: ['./search-videos.component.css'],
})
export class SearchVideosComponent implements OnInit {
  videos: Video[] = [];
  combinedVideoAuthor: VideoAuthor[] = [];
  searchInput: string = '';

  constructor(
    private videoService: VideoUploadService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navbarService: NavbarToggleService
  ) {
    this.searchInput =
      this.activatedRoute.snapshot.params['searchInput'].toLowerCase();
    console.log(this.searchInput);
    this.navbarService.updateData(true, 'side');
  }

  ngOnInit(): void {
    this.getAllVideos();

    // router.events keeps track of navigation events, so here we check if an event is of type NavigationeEnd
    // NavigationEnd event occurs when a navigation successfully ends and when this happens we are updating searchInput value.
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.searchInput =
          this.activatedRoute.snapshot.params['searchInput'].toLowerCase();
      }
    });
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
    this.router.navigateByUrl('watch-video/' + videoId);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  addToWatchLater(videoId: string) {
    this.userService.addToWatchLater(videoId).subscribe((data) => {
      console.log(data);
    });
  }
}
