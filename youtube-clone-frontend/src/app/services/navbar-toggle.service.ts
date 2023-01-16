import { Injectable } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarToggleService {
  private homePageSubject = new BehaviorSubject<boolean>(false);
  homePage = this.homePageSubject.asObservable();

  private modeSubject = new BehaviorSubject<MatDrawerMode>('over');
  mode = this.modeSubject.asObservable();

  updateData(homePage: boolean, mode: MatDrawerMode) {
    this.homePageSubject.next(homePage);
    this.modeSubject.next(mode);
  }
}
