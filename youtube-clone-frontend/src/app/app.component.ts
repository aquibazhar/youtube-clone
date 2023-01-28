import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      /*...*/
      console.log(isAuthenticated);
      if (isAuthenticated) {
        this.router.navigateByUrl('/register');
      }
    });
  }
  title = 'youtube-clone-frontend';
}
