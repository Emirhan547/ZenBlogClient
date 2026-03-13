import { CategoryDto } from "./category";
import { CommentDto } from "./commentDto";
import { UserDto } from "./userDto";

export class BlogDto {
  id!: string;
  title!: string;
  coverImage?: string;
  blogImage?: string;
  description!: string;

  categoryId!: string;
  category?: CategoryDto;

  userId!: string;
  user?: UserDto;

  createdAt!: Date;
  updatedAt?: Date;

  comments?: CommentDto[];
}
