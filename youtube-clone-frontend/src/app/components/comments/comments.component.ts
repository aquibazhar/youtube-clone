import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() videoId: string = '';
  @Input() dpUrl: string = '';
  comments: Comment[] = [];
  inputIsFocussed: boolean = false;
  commentForm: FormGroup;
  currentDate: string = '';
  user: User;
  commentAuthorId: string = '';

  constructor(private fb: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      comment: [''],
    });
    const userJson = localStorage.getItem('user');
    this.user = userJson !== null ? JSON.parse(userJson) : {};
  }

  ngOnInit(): void {
    this.getComments();
  }

  onComment() {
    console.log(this.videoId);
    const date = new Date();
    this.currentDate = date.toISOString().substring(0, 10);
    const comment = new Comment(
      this.commentForm.value.comment,
      this.user.id,
      0,
      0,
      this.currentDate
    );
    this.commentService.addComment(comment, this.videoId).subscribe((data) => {
      this.getComments();
      this.onCancel();
    });
  }

  onCancel() {
    this.commentForm.reset();
    this.commentForm.controls['comment'].setValue('');
  }

  getComments() {
    this.commentService.getAllComments(this.videoId).subscribe((data) => {
      this.comments = data;
    });
  }
}
