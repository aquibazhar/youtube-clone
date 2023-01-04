import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css'],
})
export class SaveVideoDetailsComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  constructor(private fb: FormBuilder) {}
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
}
