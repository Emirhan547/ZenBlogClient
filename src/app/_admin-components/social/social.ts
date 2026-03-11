import { Component, OnInit } from '@angular/core';
import { SocialDto } from '../../_models/socialDto';
import { SocialService } from '../../_services/social-service';
import { AuthService } from '../../_services/auth-service';
import { SweetalertService } from '../../_services/sweetalert-service';
declare const alertify : any;

@Component({
  selector: 'app-social',
  standalone: false,
  templateUrl: './social.html',
  styleUrl: './social.css'
})
export class Social implements OnInit {
socials:SocialDto[];
newSocial: SocialDto= new SocialDto();
editSocial:any ={};
errors:any= [];

ngOnInit(): void {

  this.getSocials();

}


constructor(private socialService : SocialService,
            private authService: AuthService,
            private swal : SweetalertService
){

}

getSocials(){
 this.socialService.getAll().subscribe({
    next: result => this.socials= result.data,
    error: result => alertify.error("An Error Occured!")
  })
}

create(){
  this.errors= {};
  this.socialService.create(this.newSocial).subscribe({
    next: result => this.socials.push(result.data),
    error : result => {
      alertify.error("An Error Occured!");
    console.log(result.error.errors);
      this.errors= result.error.errors;


    },
    complete: () => { alertify.success("Social Created!");
      setTimeout(()=>{
          location.reload();
         }, 1000 );
         this.errors= {};
     }
  })
}




onSelected(model){
  this.errors= {};
this.editSocial= model;
}


update(){
  this.socialService.update(this.editSocial).subscribe({
   error: result =>{ alertify.error("An Error Occured!");
    this.errors = result.error.errors
   },
   complete: () => {alertify.success("Social Updated!");
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

this.socialService.delete(id).subscribe({
    error: result => alertify.error("An Error Occured!"),
    complete: ()=>{ alertify.success("Social Deleted!");
      this.getSocials()
    }

  })

}
else{
  console.log("Delete Reverted")
}

}


}
