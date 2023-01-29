import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WarnDialog } from 'src/app/models/warn-dialog';

@Component({
  selector: 'app-warn-dialog',
  templateUrl: './warn-dialog.component.html',
  styleUrls: ['./warn-dialog.component.css'],
})
export class WarnDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WarnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WarnDialog
  ) {}

  ngOnInit(): void {}
}
