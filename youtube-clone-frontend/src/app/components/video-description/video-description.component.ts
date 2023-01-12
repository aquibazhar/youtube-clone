import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.css'],
})
export class VideoDescriptionComponent implements OnInit {
  @Input() viewCount: number = 0;
  @Input() date: string = '';
  @Input() tags: string[] = [];
  @Input() description: string = '';

  expanded: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
