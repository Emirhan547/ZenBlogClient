import { BlogDto } from "./blog";
import { SubCommentDto } from "./subCommentDto";


export class CommentDto{
 id;
  firstName;
  lastName;
  email;
  blogId;
  blog:BlogDto;
  body;
  commentDate;
  subComments: SubCommentDto[];
}
