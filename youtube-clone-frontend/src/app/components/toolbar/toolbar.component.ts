import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
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
  isAuthenticated: boolean = false;
  homePage: boolean = false;
  currentUserId: string;
  currentUser: User = {} as User;
  activeFlag: boolean = false;
  mode: MatDrawerMode = 'over';
  searchForm: FormGroup;
  subscriptionsIds: string[] = [];
  subscriptions: User[] = [];

  constructor(
    private oidcSecurityService: OidcSecurityService,
    public dialog: MatDialog,
    private userService: UserService,
    private navbarService: NavbarToggleService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      input: [''],
    });
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
          this.subscriptionsIds = data.subscribedToUsers;
          this.findSubscriptions();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  findSubscriptions() {
    this.userService
      .findUsersByIds(this.subscriptionsIds)
      .subscribe((subscriptions) => {
        console.log(subscriptions);
        this.subscriptions = subscriptions;
      });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService
      .logoffAndRevokeTokens()
      .subscribe((result) => console.log(result));
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadVideoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openSaveVideo() {
    const dialogRef = this.dialog.open(SaveVideoDetailsComponent, {
      data: {
        videoId: 'hello',
      },
    });
  }

  onSearch() {
    console.log(this.searchForm.value);
    this.router.navigateByUrl('/search/' + this.searchForm.value.input);
  }

  onReset() {
    this.searchForm.reset();
    this.searchForm.controls['input'].setValue('');
  }
}
