import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../_services/blog-service';
import { ActivatedRoute } from '@angular/router';
import { BlogDto } from '../../_models/blog';

@Component({
  selector: 'app-blogdetails',
  standalone: false,
  templateUrl: './blogdetails.html',
  styleUrls: ['./blogdetails.css']
})
export class Blogdetails implements OnInit {

  blog: BlogDto | null = null;
  latestBlogs: BlogDto[] = [];

  isLoading = true;
  hasLoadError = false;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.hasLoadError = true;
      this.isLoading = false;
      return;
    }

    this.loadBlog(id);
  }

  private loadBlog(id: string): void {

    this.blogService.getBlogById(id).subscribe({

      next: (res: any) => {

        console.log("BLOG RESULT:", res);

        if (res && res.data) {
          this.blog = res.data;
        } else {
          this.hasLoadError = true;
        }

        this.isLoading = false;

        this.loadLatestBlogs();

      },

      error: () => {

        this.hasLoadError = true;
        this.isLoading = false;

      }

    });

  }

  private loadLatestBlogs(): void {

    this.blogService.getLatest5Blogs().subscribe({

      next: (res: any) => {

        console.log("LATEST BLOGS:", res);

        this.latestBlogs = res?.data ?? [];

      },

      error: () => {

        this.latestBlogs = [];

      }

    });

  }

}
