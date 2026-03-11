import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../_models/result';
import { ContactInfoDto } from '../_models/contactInfoDto';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {


   constructor(private http: HttpClient

  ){}

baseUrl= "https://localhost:7000/api/contactInfos/";


getAll(){
  return this.http.get<Result<ContactInfoDto[]>>(this.baseUrl);
}

create(model:ContactInfoDto){
  return this.http.post<Result<ContactInfoDto>>(this.baseUrl,model);
}

update(model:ContactInfoDto){
  return this.http.put(this.baseUrl,model);
}

delete(id:string){
  return this.http.delete(this.baseUrl+id);
}

getBlogById(id:string){
  return this.http.get<Result<ContactInfoDto>>(this.baseUrl+id);
}

}
