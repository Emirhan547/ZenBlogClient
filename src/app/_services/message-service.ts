import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { MessageDto } from '../_models/messageDto';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor(private http: HttpClient

  ){}

baseUrl= "https://localhost:7000/api/messages/";


  getAll(){
    return this.http.get<Result<MessageDto[]>>(this.baseUrl);
  }

  getReadMessages(){
    return this.http.get<Result<MessageDto[]>>(this.baseUrl+"read");
  }

  getUnreadMessages(){
    return this.http.get<Result<MessageDto[]>>(this.baseUrl+"unread");
  }


  create(model:MessageDto){
    return this.http.post<Result<MessageDto>>(this.baseUrl,model);
  }

  update(model:MessageDto){
    return this.http.put(this.baseUrl,model);
  }

  delete(id:string){
    return this.http.delete(this.baseUrl+id);
  }

  getBlogById(id:string){
    return this.http.get<Result<MessageDto>>(this.baseUrl+id);
  }
}
