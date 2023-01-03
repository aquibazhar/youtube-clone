import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css'],
})
export class SaveVideoDetailsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  videoForm = this.fb.group({
    title: [''],
    description: [''],
    videoStatus: [''],
  });
  ngOnInit(): void {}

  onSubmit() {
    console.log(this.videoForm.value);
  }
}
