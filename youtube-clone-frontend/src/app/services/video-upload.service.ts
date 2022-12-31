import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'

import { catchError, Observable, retry, throwError } from 'rxjs'

const URL_VIDEO_UPLOAD = 'http://localhost:8080/api/v1/video'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'video/mp4',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {

  constructor(private http: HttpClient) { }

  uploadVideo(videoData : File): Observable<any> {
    const formData = new FormData()
    formData.append('video', videoData, videoData.name)
    return this.http.post(URL_VIDEO_UPLOAD, formData);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      )
    }
    // Return an observable with a user-facing error message.
    if (error.status === 409) {
      return throwError(
        () => new Error('You have already added this city to watchlist'),
      )
    } else {
      return throwError(
        () => new Error('Something went bad ! Please try again after sometime'),
      )
    }
  }
}
