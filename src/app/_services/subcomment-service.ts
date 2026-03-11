import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { SubCommentDto } from '../_models/subCommentDto';

@Injectable({
  providedIn: 'root'
})
export class SubCommentService {
  constructor(private http: HttpClient

  ){}

baseUrl= "https://localhost:7000/api/subComments/";


  getAll(){
    return this.http.get<Result<SubCommentDto[]>>(this.baseUrl);
  }

  create(model:SubCommentDto){
    return this.http.post<Result<SubCommentDto>>(this.baseUrl,model);
  }

  update(model:SubCommentDto){
    return this.http.put(this.baseUrl,model);
  }

  delete(id:string){
    return this.http.delete(this.baseUrl+id);
  }

  getBlogById(id:string){
    return this.http.get<Result<SubCommentDto>>(this.baseUrl+id);
  }
}
