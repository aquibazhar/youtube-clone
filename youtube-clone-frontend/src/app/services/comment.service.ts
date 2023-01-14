import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Comment } from '../models/comment';

const COMMENT_SERVICE_URL = 'http://localhost:8080/api/v1/comment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(COMMENT_SERVICE_URL, comment);
  }

  getAllComments(videoId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(COMMENT_SERVICE_URL + '/' + videoId);
  }

  likeComment(commentId: string): Observable<Comment> {
    return this.http.post<Comment>(
      COMMENT_SERVICE_URL + '/like/' + commentId,
      null
    );
  }

  dislikeComment(commentId: string): Observable<Comment> {
    return this.http.post<Comment>(
      COMMENT_SERVICE_URL + '/dislike/' + commentId,
      null
    );
  }
  hasUserLiked(commentId: string): Observable<boolean> {
    return this.http.get<boolean>(COMMENT_SERVICE_URL + '/like/' + commentId);
  }

  hasUserDisliked(commentId: string): Observable<boolean> {
    return this.http.get<boolean>(
      COMMENT_SERVICE_URL + '/dislike/' + commentId
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    if (error.status === 409) {
      return throwError(
        () => new Error('You have already added this city to watchlist')
      );
    } else {
      return throwError(
        () => new Error('Something went bad ! Please try again after sometime')
      );
    }
  }
}
