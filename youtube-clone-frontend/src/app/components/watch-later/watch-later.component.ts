import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { VideoHistory } from 'src/app/models/video-history';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.css'],
})
export class WatchLaterComponent implements OnInit {
  currentUser: User = {} as User;
  currentUserId: string;
  watchLater: VideoHistory[] = [];
  dataFetched: boolean = false;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    const userId = localStorage.getItem('userId');
    this.currentUserId = userId !== null ? userId : '';
    this.userService.getUserById(this.currentUserId).subscribe((data) => {
      this.currentUser = data;
      this.watchLater = data.watchLater;
      if (this.watchLater.length !== 0) this.dataFetched = true;
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
