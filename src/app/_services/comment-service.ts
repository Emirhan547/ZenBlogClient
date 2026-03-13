import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDto } from '../_models/commentDto';
import { Result } from '../_models/result';
import { CreateCommentDto } from '../_models/createCommentDto';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private secureBaseUrl = 'https://localhost:7000/api/comments/';
  private fallbackBaseUrl = 'http://localhost:5000/api/comments/';

  constructor(private http: HttpClient) {}


  getAll() {
    return this.getWithProtocolFallback<CommentDto[]>('');
  }

  create(commentDto: CreateCommentDto) {
    return this.http.post<Result<CommentDto>>(this.secureBaseUrl, commentDto)
      .pipe(
        timeout(6000),
        catchError(() => this.http.post<Result<CommentDto>>(this.fallbackBaseUrl, commentDto).pipe(timeout(6000)))
      );
  }


  update(model: CommentDto) {
    return this.http.put(this.secureBaseUrl, model);
  }


  delete(id: string) {
    return this.http.delete(this.secureBaseUrl + id);
  }


  getById(id: string) {
    return this.getWithProtocolFallback<CommentDto>(id);
  }

  private getWithProtocolFallback<T>(path: string) {
    const secureUrl = this.secureBaseUrl + path;
    const fallbackUrl = this.fallbackBaseUrl + path;

    return this.http.get<Result<T>>(secureUrl)
      .pipe(
        timeout(6000),
        catchError(() => this.http.get<Result<T>>(fallbackUrl).pipe(timeout(6000)))
      );
  }

}
