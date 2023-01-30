import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chips-bar',
  templateUrl: './chips-bar.component.html',
  styleUrls: ['./chips-bar.component.css'],
})
export class ChipsBarComponent implements OnInit {
  @Input() videoTags: string[] = [];
  selectedTags = new Set();
  @Output() tagChanged: EventEmitter<string> = new EventEmitter<string>();
  shift: number = 0;
  showLeft: boolean = false;
  showRight: boolean = true;
  leftClick: number = 0;
  rightClick: number = 0;

  constructor() {
    this.selectedTags.add('All');
  }

  ngOnInit(): void {
    this.videoTags.findIndex;
  }

  onTagClicked(tag: string) {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.clear();
      this.selectedTags.add(tag);

      this.tagChanged.emit(tag);
    }
  }

  goLeft() {
    if (this.leftClick <= Math.ceil((this.videoTags.length - 16) / 3)) {
      this.shift = this.shift + 200;
      this.showLeft = true;
      this.leftClick = this.leftClick + 1;
      console.log(this.shift);
    }

    if (this.leftClick >= Math.ceil((this.videoTags.length - 16) / 3)) {
      this.showLeft = false;
    }
    if (this.leftClick === Math.ceil((this.videoTags.length - 16) / 3)) {
      this.showRight = true;
      this.rightClick = 0;
    }
  }

  goRight() {
    if (this.rightClick <= Math.ceil((this.videoTags.length - 16) / 3)) {
      this.rightClick = this.rightClick + 1;
      this.leftClick = this.leftClick - 1;
      this.showLeft = true;
      this.shift = this.shift - 200;
      console.log(this.shift);
    }
    if (this.rightClick >= Math.ceil((this.videoTags.length - 16) / 3)) {
      this.showRight = false;
      console.log(this.shift);
    }

    if (this.rightClick === Math.ceil((this.videoTags.length - 16) / 3)) {
      this.showLeft = true;
      this.leftClick = 0;
    }
  }
}
