import { Component } from '@angular/core';
import { CommentService } from '../../_services/comment-service';
import { SweetalertService } from '../../_services/sweetalert-service';
import { CommentDto } from '../../_models/commentDto';
declare const alertify:any;

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.html',
  styleUrl: './comment.css'
})
export class Comment {

constructor(private commentService: CommentService,
            private swal: SweetalertService
){
  this.getcomments();
}


comments: CommentDto[];
newComment: CommentDto = new CommentDto();
editComment:any = {};
errors: any=[];


getcomments(){
  this.commentService.getAll().subscribe({
    next: result=> this.comments= result.data,
    error: result=> console.log(result.errors)
  }
    )
  };



async delete(id){

const isConfirmed = await this.swal.areYouSure();


if(isConfirmed){
this.commentService.delete(id).subscribe({
  error: result => {console.error(result.error);
    alertify.error("An Error Occured!")
  },
  complete: () => {alertify.success("Comment Deleted!");
    this.getcomments();
  }
})

}
else{
  console.log("Delete Reverted")
}



};





}
