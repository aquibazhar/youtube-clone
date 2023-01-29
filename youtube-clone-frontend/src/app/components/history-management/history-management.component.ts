import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { NavbarToggleService } from 'src/app/services/navbar-toggle.service';
import { UserService } from 'src/app/services/user.service';
import { WarnDialogComponent } from '../warn-dialog/warn-dialog.component';

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
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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
    if (!this.currentUser.pauseHistory) {
      const dialogRef = this.dialog.open(WarnDialogComponent, {
        data: {
          title: 'Pause watch history?',
          subtitle: 'This will pause your watch history.',
          buttonText: 'Pause',
        },
      });

      dialogRef.afterClosed().subscribe((confirmation) => {
        if (confirmation) {
          this.userService.togglePauseHistory().subscribe((data) => {
            this.currentUser = data;
            this.openSnackBar('Watch history paused successfully!!!', 'OK');
          });
        }
      });
    } else {
      const dialogRef = this.dialog.open(WarnDialogComponent, {
        data: {
          title: 'Turn on watch history?',
          subtitle: 'This will turn on your watch history.',
          buttonText: 'Turn on',
        },
      });

      dialogRef.afterClosed().subscribe((confirmation) => {
        if (confirmation) {
          this.userService.togglePauseHistory().subscribe((data) => {
            this.currentUser = data;
            this.openSnackBar('Watch history turned on successfully!!!', 'OK');
          });
        }
      });
    }
  }

  onClear() {
    const dialogRef = this.dialog.open(WarnDialogComponent, {
      data: {
        title: 'Clear watch history?',
        subtitle: 'Your YouTube watch history will be cleared completely.',
        buttonText: 'Clear watch history',
      },
    });

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.getUserDetails();
        this.clearHistory.emit();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }
}
