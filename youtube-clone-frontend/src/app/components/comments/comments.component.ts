import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  inputIsFocussed: boolean = false;
  commentForm: FormGroup;
  currentDate: string = '';
  user: User;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      comment: [''],
    });
    const userJson = localStorage.getItem('user');
    this.user = userJson !== null ? JSON.parse(userJson) : {};
  }

  ngOnInit(): void {}

  onComment() {
    const date = new Date();
    this.currentDate = date.toISOString().substring(0, 10);
    const comment = new Comment(
      this.commentForm.value.comment,
      this.user.id,
      0,
      0,
      this.currentDate
    );
    console.log(comment);
  }

  onCancel() {
    this.commentForm.reset();
    this.commentForm.controls['comment'].setValue('');
  }
}
