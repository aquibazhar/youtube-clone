import { Component, OnInit } from '@angular/core';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';

@Component({
  selector: 'app-history-management',
  templateUrl: './history-management.component.html',
  styleUrls: ['./history-management.component.css'],
})
export class HistoryManagementComponent implements OnInit {
  constructor(private navbarService: NavbarToggleService) {
    this.navbarService.updateData(true, 'side');
  }

  ngOnInit(): void {}
}
