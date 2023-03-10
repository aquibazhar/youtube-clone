import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.css'],
})
export class LikedVideosComponent implements OnInit {
  currentUser: User = {} as User;
  currentUserId: string;
  likedVideos: string[] = [];
  dataFetched: boolean = false;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    const userId = localStorage.getItem('userId');
    this.currentUserId = userId !== null ? userId : '';
    this.userService.getUserById(this.currentUserId).subscribe((data) => {
      this.currentUser = data;
      this.likedVideos = data.likedVideos;
      if (this.likedVideos.length !== 0) this.dataFetched = true;
      else this.dataFetched = false;
    });
  }

  ngOnInit(): void {}

  onPlaylistCleared(message: string) {
    this.dataFetched = false;
    this.openSnackBar(message, 'OK');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }
}
