import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-playlist',
  templateUrl: './empty-playlist.component.html',
  styleUrls: ['./empty-playlist.component.css'],
})
export class EmptyPlaylistComponent implements OnInit {
  @Input() currentUserName: string = '';
  @Input() heading: string = '';
  constructor() {}

  ngOnInit(): void {}
}
