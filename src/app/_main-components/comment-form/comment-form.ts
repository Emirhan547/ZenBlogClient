import { Component } from '@angular/core';
import { CommentService } from '../../_services/comment-service';
import { CommentDto } from '../../_models/commentDto';
import { ActivatedRoute } from '@angular/router';
declare const alertify: any;

@Component({
  selector: 'comment-form',
  standalone: false,
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.css'
})
export class CommentForm {
  newComment: CommentDto = new CommentDto();

constructor(private commentService: CommentService,
            private route: ActivatedRoute
){}


createComment(){
this.newComment.blogId= this.route.snapshot.params["id"];

  this.commentService.create(this.newComment).subscribe({
    error: result => alertify.error("Comment Post Failed!"),
    complete: () => {
      alertify.success("Comment Posted!");
      location.reload();
    }
  })

}


}
