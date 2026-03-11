import { Component } from '@angular/core';
import { MessageService } from '../../_services/message-service';
import { MessageDto } from '../../_models/messageDto';
import Swal from 'sweetalert2';
declare const alertify: any;

@Component({
  selector: 'send-message',
  standalone: false,
  templateUrl: './send-message.html',
  styleUrl: './send-message.css'
})
export class SendMessage {
newMessage: MessageDto= new MessageDto();
  constructor(private messageService: MessageService

  ){}




sendMessage(){
  this.messageService.create(this.newMessage).subscribe({
    error: result => alertify.error("Message Send Failed!"),
    complete: ()=> {
      Swal.fire({
        title: 'Message has been sent!',
        showCancelButton: false,
        icon: 'success'
      });

       setTimeout(()=>{
          location.reload();
         }, 1000 )


    }
  })
}

}
