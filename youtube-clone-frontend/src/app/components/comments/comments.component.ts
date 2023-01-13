import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { CommentAuthor } from 'src/app/models/comment-author';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() videoId: string = '';
  @Input() currentUser: User = {} as User;
  comments: Comment[] = [];
  inputIsFocussed: boolean = false;
  commentForm: FormGroup;
  currentDate: string = '';
  commentAuthorId: string = '';
  combinedCommentAuthor: CommentAuthor[] = [];

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private userService: UserService
  ) {
    this.commentForm = this.fb.group({
      comment: [''],
    });
  }

  ngOnInit(): void {
    this.getComments();
  }

  onComment() {
    console.log(this.videoId);
    const date = new Date();
    this.currentDate = date.toISOString();
    const comment = new Comment(
      this.commentForm.value.comment,
      this.currentUser.id,
      0,
      0,
      this.currentDate
    );
    console.log(comment);
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
      this.getAllCommentAuthors();
      console.log(this.combinedCommentAuthor);
    });
  }

  getAllCommentAuthors() {
    this.combinedCommentAuthor = [];
    this.comments.forEach((comment) => {
      this.userService.getUserById(comment.authorId).subscribe((data) => {
        this.combinedCommentAuthor.push(new CommentAuthor(comment, data));
        this.sortCombinedArray();
      });
    });
  }

  sortCombinedArray() {
    this.combinedCommentAuthor.sort((a, b) => {
      let date1 = Date.parse(a.comment.publishedAt);
      let date2 = Date.parse(b.comment.publishedAt);
      return date2 - date1;
    });
  }
}
