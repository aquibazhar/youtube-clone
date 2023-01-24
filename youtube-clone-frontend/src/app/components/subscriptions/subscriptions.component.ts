import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
})
export class SubscriptionsComponent implements OnInit {
  currentUser: User = {} as User;
  currentUserId: string;
  userSubscriptions: string[] = [];

  toggleView: boolean = true;
  dataFetched: boolean;

  constructor(
    private userService: UserService,
    private navbarService: NavbarToggleService
  ) {
    this.navbarService.updateData(true, 'side');
    this.dataFetched = false;
    const userId = localStorage.getItem('userId');
    this.currentUserId = userId !== null ? userId : '';
    this.userService.getUserById(this.currentUserId).subscribe((data) => {
      this.currentUser = data;
      this.userSubscriptions = data.subscribedToUsers;

      this.dataFetched = true;
    });
  }

  ngOnInit(): void {}
}
