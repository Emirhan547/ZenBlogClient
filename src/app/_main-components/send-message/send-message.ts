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
newMessage: MessageDto = new MessageDto();
  isLoading = false;
  isSubmitted = false;
  errorText = '';

  constructor(private messageService: MessageService) {}

  sendMessage(){
    this.isLoading = true;
    this.isSubmitted = false;
    this.errorText = '';

    this.messageService.create(this.newMessage).subscribe({
      next: () => {
        this.isSubmitted = true;
        this.newMessage = new MessageDto();
      },
      error: () => {
        this.errorText = 'Mesaj gönderilemedi, lütfen tekrar deneyiniz.';
        alertify.error('Message Send Failed!');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Message has been sent!',
          showCancelButton: false,
          icon: 'success'
        });
      }
    });
  }
}
