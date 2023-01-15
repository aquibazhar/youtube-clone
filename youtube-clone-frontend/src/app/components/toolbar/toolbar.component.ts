import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UploadVideoComponent } from '../upload-video/upload-video.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  titleFlag: boolean = true;
  isAuthenticated: boolean = false;
  constructor(
    private oidcSecurityService: OidcSecurityService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
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
