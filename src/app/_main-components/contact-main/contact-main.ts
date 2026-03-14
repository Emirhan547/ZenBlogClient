import { Component } from '@angular/core';
import { ContactInfoService } from '../../_services/contact-info-service';
import { ContactInfoDto } from '../../_models/contactInfoDto';

@Component({
  selector: 'app-contact-main',
  standalone: false,
  templateUrl: './contact-main.html',
  styleUrl: './contact-main.css'
})
export class ContactMain {

contactInfos: ContactInfoDto[] = [];
primaryContactInfo: ContactInfoDto | null = null;

  constructor(private contactInfoService: ContactInfoService){
    this.getContactInfos();
  }



getContactInfos(){
  this.contactInfoService.getAll().subscribe({
   next : result => {
      this.contactInfos= result.data;
      this.primaryContactInfo = this.contactInfos.length > 0 ? this.contactInfos[0] : null;
    },
    error: result => console.log(result.error)
  })
}



}
