import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogDto } from '../_models/blog';
import { Result } from '../_models/result';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  constructor(private http: HttpClient

  ){}

baseUrl= "https://localhost:7000/api/blogs/";


getAll(){
  return this.http.get<Result<BlogDto[]>>(this.baseUrl);
}

getLatest5Blogs(){
  return this.http.get<Result<BlogDto[]>>(this.baseUrl+"latest5blogs");
}

create(model:BlogDto){
  return this.http.post<Result<BlogDto>>(this.baseUrl,model);
}

update(model:BlogDto){
  return this.http.put(this.baseUrl,model);
}

delete(id:string){
  return this.http.delete(this.baseUrl+id);
}

getBlogById(id:string){
  return this.http.get<Result<BlogDto>>(this.baseUrl+id);
}



}
