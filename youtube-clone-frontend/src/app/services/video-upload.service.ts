import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { Video } from '../models/video';

const VIDEO_SERVICE_URL = 'http://localhost:8080/api/v1/video';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class VideoUploadService {
  constructor(private http: HttpClient) {}

  uploadVideo(videoData: File): Observable<Video> {
    const formData = new FormData();
    formData.append('video', videoData, videoData.name);
    return this.http.post<Video>(VIDEO_SERVICE_URL, formData);
  }

  uploadThumbnail(thumbnail: File, videoId: string): Observable<string> {
    const formData = new FormData();
    formData.append('thumbnail', thumbnail, thumbnail.name);
    formData.append('videoId', videoId);
    return this.http.post(VIDEO_SERVICE_URL + '/thumbnail', formData, {
      responseType: 'text',
    });
  }

  getVideoDetails(videoId: string): Observable<Video> {
    return this.http.get<Video>(VIDEO_SERVICE_URL + '/' + videoId);
  }

  saveVideoMetaData(video: Video): Observable<Video> {
    return this.http.put<Video>(VIDEO_SERVICE_URL, video);
  }

  getAllVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(VIDEO_SERVICE_URL);
  }

  likeVideo(videoId: string): Observable<Video> {
    return this.http.get<Video>(VIDEO_SERVICE_URL + '/like/' + videoId);
  }

  dislikeVideo(videoId: string): Observable<Video> {
    return this.http.get<Video>(VIDEO_SERVICE_URL + '/dislike/' + videoId);
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
