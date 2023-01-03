import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { VideoUploadService } from 'src/app/services/video-upload.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css'],
})
export class UploadVideoComponent implements OnInit {
  fileUploaded: boolean = false;
  videoData: FileSystemFileEntry | undefined;
  video: File | undefined;

  constructor(
    private videoService: VideoUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.videoData = droppedFile.fileEntry as FileSystemFileEntry;
        this.videoData.file((file: File) => {
          console.log(droppedFile.relativePath, file);
          this.fileUploaded = true;
        });
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  onUpload() {
    if (this.videoData !== undefined) {
      this.videoData.file((video) => {
        this.video = video;
        this.videoService.uploadVideo(video).subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl('/save-video/' + data.id);
        });
      });
    } else {
      console.log('something went wrong');
    }
  }
}
