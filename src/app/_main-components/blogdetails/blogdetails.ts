import { Component } from '@angular/core';
import { BlogService } from '../../_services/blog-service';
import { ActivatedRoute } from '@angular/router';
import { BlogDto } from '../../_models/blog';
import { CommentDto } from '../../_models/commentDto';

@Component({
  selector: 'app-blogdetails',
  standalone: false,
  templateUrl: './blogdetails.html',
  styleUrl: './blogdetails.css'
})
export class Blogdetails {
blog: BlogDto;
  latestBlogs: BlogDto[] = [];
  newComment: CommentDto = new CommentDto();

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        return;
      }

      this.getBlogById(id);
      this.newComment.blogId = id;
    });

    this.getLatestBlogs();
  }

  getBlogById(id: string) {
    this.blogService.getBlogById(id).subscribe({
      next: (result) => (this.blog = result.data)
    });
  }

  getLatestBlogs() {
    this.blogService.getLatest5Blogs().subscribe({
      next: (result) => (this.latestBlogs = result.data)
    });
  }

  postComment() {
    this.newComment.blogId = this.blog?.id;
  }
}
