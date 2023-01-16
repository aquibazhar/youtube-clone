import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { User } from 'src/app/models/user';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';
import { SaveVideoDetailsComponent } from '../save-video-details/save-video-details.component';
import { UploadVideoComponent } from '../upload-video/upload-video.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  titleFlag: boolean = true;
  isAuthenticated: boolean = false;
  homePage: boolean = false;
  currentUserId: string;
  currentUser: User = {} as User;
  mode: MatDrawerMode = 'over';
  constructor(
    private oidcSecurityService: OidcSecurityService,
    public dialog: MatDialog,
    private userService: UserService,
    private navbarService: NavbarToggleService
  ) {
    const userId = localStorage.getItem('userId');
    this.currentUserId = userId !== null ? userId : '';
    this.navbarService.homePage.subscribe(
      (homePage) => (this.homePage = homePage)
    );
    this.navbarService.mode.subscribe((mode) => (this.mode = mode));
  }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        this.userService.getUserById(this.currentUserId).subscribe((data) => {
          this.currentUser = data;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoffAndRevokeTokens();
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadVideoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
