import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  searchInput: string = '';
  emptyHistory: boolean = false;
  currentUserId: string;
  currentUser: User = {} as User;

  constructor(private userService: UserService) {
    const userId = localStorage.getItem('userId');
    this.currentUserId = userId !== null ? userId : '';
    this.getUserDetails();
  }

  ngOnInit(): void {}

  getUserDetails() {
    this.userService.getUserById(this.currentUserId).subscribe((data) => {
      this.currentUser = data;
      this.emptyHistory = data.videoHistory.length === 0;
    });
  }

  onSearch(searchInput: string) {
    this.searchInput = searchInput;
  }

  onCancel() {
    this.searchInput = '';
  }
  onClearHistory() {
    this.userService.clearWatchHistory().subscribe((data) => {
      console.log(data);
      this.emptyHistory = true;
    });
  }
}
