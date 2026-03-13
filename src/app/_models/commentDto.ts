import { BlogDto } from "./blog";
import { SubCommentDto } from "./subCommentDto";

export class CommentDto {

  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  body!: string;
  commentDate!: Date;

  blogId!: string;
  blog!: BlogDto;

  subComments!: SubCommentDto[];

}
