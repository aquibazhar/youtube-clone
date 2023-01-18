import { Component, OnInit } from '@angular/core';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.css'],
})
export class PlaylistViewComponent implements OnInit {
  dominant!: string;

  // imageUrl: string ='https://material.angular.io/assets/img/examples/shiba2.jpg';
  imageUrl: string = 'assets/tenz.jpg';

  constructor(private navbarService: NavbarToggleService) {
    this.navbarService.updateData(true, 'side');
  }

  ngOnInit(): void {}
}
