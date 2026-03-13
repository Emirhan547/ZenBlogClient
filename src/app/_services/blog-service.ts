import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogDto } from '../_models/blog';
import { Result } from '../_models/result';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private secureBaseUrl = 'https://localhost:7000/api/blogs/';
  private fallbackBaseUrl = 'http://localhost:5000/api/blogs/';

  constructor(private http: HttpClient) {}


  getAll() {
    return this.getWithProtocolFallback<BlogDto[]>('');
  }

  getLatest5Blogs() {
    return this.getWithProtocolFallback<BlogDto[]>('latest5blogs');
  }

  create(model: BlogDto) {
    return this.http.post<Result<BlogDto>>(this.secureBaseUrl, model);
  }


  update(model: BlogDto) {
    return this.http.put(this.secureBaseUrl, model);
  }


  delete(id: string) {
    return this.http.delete(this.secureBaseUrl + id);
  }


  getBlogById(id: string) {
    return this.getWithProtocolFallback<BlogDto>(id);
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
