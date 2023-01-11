import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { User } from '../models/user';

const USER_SERVICE_URL = 'http://localhost:8080/api/v1/user';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetails!: User;

  constructor(private http: HttpClient) {}

  registerUser() {
    this.http.post<User>(USER_SERVICE_URL, null).subscribe((data) => {
      this.userDetails = data;
    });
  }

  subscribeToUser(userId: string) {
    return this.http.post(USER_SERVICE_URL + '/subscribe/' + userId, null, {
      responseType: 'text',
    });
  }

  unsubscribeFromuser(userId: string) {
    return this.http.post(USER_SERVICE_URL + '/unsubscribe/' + userId, null, {
      responseType: 'text',
    });
  }

  getUser() {
    return this.userDetails;
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