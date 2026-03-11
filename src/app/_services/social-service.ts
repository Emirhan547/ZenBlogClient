import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialDto } from '../_models/socialDto';
import { Result } from '../_models/result';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(private http: HttpClient

  ){}

baseUrl= "https://localhost:7000/api/socials/";


  getAll(){
    return this.http.get<Result<SocialDto[]>>(this.baseUrl);
  }

  create(model:SocialDto){
    return this.http.post<Result<SocialDto>>(this.baseUrl,model);
  }

  update(model:SocialDto){
    return this.http.put(this.baseUrl,model);
  }

  delete(id:string){
    return this.http.delete(this.baseUrl+id);
  }

  getBlogById(id:string){
    return this.http.get<Result<SocialDto>>(this.baseUrl+id);
  }
}
