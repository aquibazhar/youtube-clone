import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private videoService: VideoUploadService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
}
