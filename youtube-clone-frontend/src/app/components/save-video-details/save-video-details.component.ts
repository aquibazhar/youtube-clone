import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, V } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoUploadService } from 'src/app/services/video-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Video } from 'src/app/models/video';
import { MatDialog } from '@angular/material/dialog';
import { UploadVideoComponent } from '../upload-video/upload-video.component';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css'],
})
export class SaveVideoDetailsComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  currentDate: string = '';

  thumbnail!: File;
  thumbnailName: string = '';
  videoId: string = '';
  thumbnailSelected: boolean = false;
  videoUrl: string = '';
  thumbnailUrl: string = '';

  title: string = '';
  description: string = '';
  videoStatus: string = '';

  videoForm: FormGroup;
  videoAvailable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoUploadService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.dialog.closeAll();
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideoDetails(this.videoId).subscribe((data) => {
      console.log(data);
      this.videoUrl = data.url;
      this.videoAvailable = true;
    });
    this.videoForm = this.fb.group({
      title: [''],
      description: [''],
      videoStatus: [''],
      tagList: [this.tags],
    });
  }
  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.thumbnail = event.target.files[0];
    this.thumbnailName = this.thumbnail.name;
    this.thumbnailSelected = true;
  }

  onUpload() {
    this.videoService
      .uploadThumbnail(this.thumbnail, this.videoId)
      .subscribe((data) => {
        this.thumbnailUrl = data;
        this.openSnackBar('Thumbnail uploaded successfully!', 'OK');
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  onSubmit() {
    const date = new Date();
    this.currentDate = date.toISOString();
    const videoMetaData: Video = new Video(
      this.videoId,
      this.videoForm.value.title,
      this.videoForm.value.description,
      '',
      0,
      0,
      this.videoForm.value.tagList,
      this.videoForm.value.videoStatus,
      0,
      this.thumbnailUrl,
      [],
      this.videoUrl,
      this.currentDate
    );
    this.videoService.saveVideoMetaData(videoMetaData).subscribe((data) => {
      console.log(data);
      this.openSnackBar('Video MetaData updated successfully', 'OK');
    });
  }
}
