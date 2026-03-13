import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { SocialDto } from '../_models/socialDto';

@Injectable({
  providedIn: 'root'
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
