import { Component, OnInit } from '@angular/core';
import { ContactInfoDto } from '../../_models/contactInfoDto';
import { ContactInfoService } from '../../_services/contact-info-service';
import { AuthService } from '../../_services/auth-service';
import { SweetalertService } from '../../_services/sweetalert-service';
declare const alertify :any;

@Component({
  selector: 'app-contact-info',
  standalone: false,
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.css'
})
export class ContactInfo implements OnInit {
contactInfos:ContactInfoDto[];
newContactInfo: ContactInfoDto= new ContactInfoDto();
editContactInfo:any ={};
errors:any= [];

ngOnInit(): void {

  this.getcontactInfos();

}


constructor(private contactInfoService : ContactInfoService,
            private authService: AuthService,
            private swal : SweetalertService
){

}

getcontactInfos(){
 this.contactInfoService.getAll().subscribe({
    next: result => this.contactInfos= result.data,
    error: result => alertify.error("An Error Occured!")
  })
}

create(){
  this.errors= {};
  this.contactInfoService.create(this.newContactInfo).subscribe({
    next: result => this.contactInfos.push(result.data),
    error : result => {
      alertify.error("An Error Occured!");
    console.log(result.error.errors);
      this.errors= result.error.errors;


    },
    complete: () => { alertify.success("Contact Info Created!");
      setTimeout(()=>{
          location.reload();
         }, 1000 );
         this.errors= {};
     }
  })
}




onSelected(model){
  this.errors= {};
this.editContactInfo= model;
}


update(){
  this.contactInfoService.update(this.editContactInfo).subscribe({
   error: result =>{ alertify.error("An Error Occured!");
    this.errors = result.error.errors
   },
   complete: () => {alertify.success("Contact Info Updated!");
 setTimeout(()=>{
          location.reload();
         }, 1000 );

           this.errors= {};

   }
  })
}

async delete(id){

const isConfirmed = await this.swal.areYouSure();

if(isConfirmed){

this.contactInfoService.delete(id).subscribe({
    error: result => alertify.error("An Error Occured!"),
    complete: ()=>{ alertify.success("Contact Info Deleted!");
      this.getcontactInfos()
    }

  })

}
else{
  console.log("Delete Reverted")
}

}



}
