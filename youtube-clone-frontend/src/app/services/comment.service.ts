import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor() {}
}
