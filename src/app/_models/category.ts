import { BlogDto } from "../_models/blog";


export class CategoryDto {
  id: number;
  categoryName: string;
  blogs: BlogDto[];
}
