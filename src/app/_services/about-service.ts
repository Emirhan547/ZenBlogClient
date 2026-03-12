import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboutDto } from '../_models/aboutDto';
import { Result } from '../_models/result';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  baseUrl = 'https://localhost:7000/api/abouts/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Result<AboutDto[]>>(this.baseUrl);
  }

  create(model: AboutDto) {
    return this.http.post<Result<AboutDto>>(this.baseUrl, model);
  }

  update(model: AboutDto) {
    return this.http.put(this.baseUrl, model);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }

  getById(id: string) {
    return this.http.get<Result<AboutDto>>(this.baseUrl + id);
  }
}
