import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoUploadService } from 'src/app/services/video-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css'],
})
export class SaveVideoDetailsComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  thumbnail!: File;
  thumbnailName: string = '';
  videoId: string = '';
  thumbnailSelected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoUploadService,
    private _snackBar: MatSnackBar
  ) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
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

  videoForm = this.fb.group({
    title: [''],
    description: [''],
    videoStatus: [''],
    tagList: [this.tags],
  });

  onSubmit() {
    console.log(this.videoForm.value);
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
        console.log(data);
        this.openSnackBar('Thumbnail uploaded successfully!', 'OK');
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }
}
