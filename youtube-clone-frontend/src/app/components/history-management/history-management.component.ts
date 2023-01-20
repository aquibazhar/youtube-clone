import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history-management',
  templateUrl: './history-management.component.html',
  styleUrls: ['./history-management.component.css'],
})
export class HistoryManagementComponent implements OnInit {
  isFocussed: boolean = false;
  searchForm: FormGroup;
  @Output() searchTriggered: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchCancelled: EventEmitter<string> = new EventEmitter<string>();
  @Output() clearHistory: EventEmitter<string> = new EventEmitter<string>();
  currentUser: User = {} as User;
  currentUserId: string;
  isHovered: boolean = false;
  @Input() emptyHistory: boolean = false;

  constructor(
    private navbarService: NavbarToggleService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.navbarService.updateData(true, 'side');
    this.searchForm = this.fb.group({
      searchInput: [''],
    });
    const userId = localStorage.getItem('userId');
    this.currentUserId = userId !== null ? userId : '';
    this.getUserDetails();
  }

  ngOnInit(): void {}

  getUserDetails() {
    this.userService.getUserById(this.currentUserId).subscribe((data) => {
      this.currentUser = data;
    });
  }

  onSearch() {
    this.searchTriggered.emit(this.searchForm.value.searchInput);
  }

  onCancel(event: any) {
    event.stopPropagation();
    this.searchForm.reset();
    this.searchForm.controls['searchInput'].setValue('');
    this.searchCancelled.emit();
  }

  onPause() {
    this.userService.togglePauseHistory().subscribe((data) => {
      this.currentUser = data;
      console.log(data.pauseHistory);
    });
  }

  onClear() {
    this.getUserDetails();
    this.clearHistory.emit();
  }
}
