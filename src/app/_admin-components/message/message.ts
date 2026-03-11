import { Component, OnInit } from '@angular/core';
import { MessageDto } from '../../_models/messageDto';
import { MessageService } from '../../_services/message-service';
import { AuthService } from '../../_services/auth-service';
import { SweetalertService } from '../../_services/sweetalert-service';
declare const alertify : any;

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.html',
  styleUrl: './message.css'
})
export class Message implements OnInit {

  messages:MessageDto[];
  unreadMessages: MessageDto[];
  readMessages: MessageDto[];
  newMessage: MessageDto= new MessageDto();
  editMessage:any ={};
  errors:any= [];

  ngOnInit(): void {

    this.getUnReadMessages();
    this.getReadMessages();


  }


  constructor(private messageService : MessageService,
              private authService: AuthService,
              private swal : SweetalertService
  ){

  }

  getmessages(){
   this.messageService.getAll().subscribe({
      next: result => this.messages= result.data,
      error: result => alertify.error("An Error Occured!")
    })
  }

  getUnReadMessages(){
   this.messageService.getUnreadMessages().subscribe({
      next: result => this.unreadMessages= result.data,
      error: result => alertify.error("An Error Occured!")
    })
  }

  getReadMessages(){
   this.messageService.getReadMessages().subscribe({
      next: result => this.readMessages= result.data,
      error: result => alertify.error("An Error Occured!")
    })
  }


  create(){
    this.errors= {};
    this.messageService.create(this.newMessage).subscribe({
      next: result => this.messages.push(result.data),
      error : result => {
        alertify.error("An Error Occured!");
      console.log(result.error.errors);
        this.errors= result.error.errors;


      },
      complete: () => { alertify.success("Message Created!");
        setTimeout(()=>{
            location.reload();
           }, 1000 );
           this.errors= {};
       }
    })
  }




  onSelected(model){

  this.editMessage= model;

  this.editMessage.isRead = true;

  this.messageService.update(this.editMessage).subscribe({
    error: result => console.log(result.error),
    complete: ()=> {this.getReadMessages();
      this.getUnReadMessages();
    }
  })
  }


  update(){
    this.messageService.update(this.editMessage).subscribe({
     error: result =>{ alertify.error("An Error Occured!");
      this.errors = result.error.errors
     },
     complete: () => {alertify.success("Message Updated!");
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

  this.messageService.delete(id).subscribe({
      error: result => alertify.error("An Error Occured!"),
      complete: ()=>{ alertify.success("Message Deleted!");
        this.getReadMessages();
        this.getUnReadMessages();
      }

    })

  }
  else{
    console.log("Delete Reverted")
  }

  }

}
