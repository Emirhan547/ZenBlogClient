import { Component, Input } from '@angular/core';
import { CommentService } from '../../_services/comment-service';
import { CreateCommentDto } from '../../_models/createCommentDto';

declare const alertify: any;

@Component({
  selector: 'comment-form',
  standalone: false,
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.css']
})
export class CommentForm {

  @Input() blogId!: string;

  newComment: CreateCommentDto = new CreateCommentDto();

  constructor(private commentService: CommentService) {}

  createComment() {

    this.newComment.blogId = this.blogId;

    this.commentService.create(this.newComment).subscribe({

      next: () => {

        alertify.success("Comment Posted!");
        location.reload();

      },

      error: (err) => {

        console.log(err);
        alertify.error("Comment Post Failed!");

      }

    });

  }

}
