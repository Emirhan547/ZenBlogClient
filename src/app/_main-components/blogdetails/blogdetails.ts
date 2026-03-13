import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../_services/blog-service';
import { ActivatedRoute } from '@angular/router';
import { BlogDto } from '../../_models/blog';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-blogdetails',
  standalone: false,
  templateUrl: './blogdetails.html',
  styleUrls: ['./blogdetails.css']
})
export class Blogdetails implements OnInit, OnDestroy {

  blog: BlogDto | null = null;
  latestBlogs: BlogDto[] = [];

  isLoading = true;
  hasLoadError = false;

  private readonly destroy$ = new Subject<void>();
  private lastRequestedBlogId: string | null = null;
  private loadingGuardTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const initialId = this.route.snapshot.paramMap.get('id');


    if (initialId) {
      this.initializeBlogPage(initialId);
    } else {
      this.hasLoadError = true;
      this.isLoading = false;
    }


    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const id = params.get('id');

        if (!id || id === this.lastRequestedBlogId) {
          return;
        }

        this.initializeBlogPage(id);
      });
  }


  private initializeBlogPage(id: string): void {
    this.lastRequestedBlogId = id;
    this.blog = null;
    this.isLoading = true;
    this.hasLoadError = false;


    if (this.loadingGuardTimer) {
      clearTimeout(this.loadingGuardTimer);
    }

    this.loadingGuardTimer = setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.hasLoadError = true;
        this.cdr.detectChanges();
      }
    }, 12000);


    this.loadBlog(id);
    this.loadLatestBlogs();
  }


  ngOnDestroy(): void {
    if (this.loadingGuardTimer) {
      clearTimeout(this.loadingGuardTimer);
    }


    this.destroy$.next();
    this.destroy$.complete();
  }


  private loadBlog(id: string): void {
    this.blogService.getBlogById(id)
      .pipe(finalize(() => {
        if (this.loadingGuardTimer) {
          clearTimeout(this.loadingGuardTimer);
        }

        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (res: any) => {
          const blogData = this.extractBlogFromResponse(res);

          if (blogData) {
            this.blog = blogData;
            this.hasLoadError = false;
          } else {
            this.hasLoadError = true;
          }
        },
        error: () => {
          this.hasLoadError = true;
        }
      });
  }

  private loadLatestBlogs(): void {

    this.blogService.getLatest5Blogs().subscribe({

      next: (res: any) => {


        this.latestBlogs = this.extractBlogsFromResponse(res);

      },

      error: () => {

        this.latestBlogs = [];

      }

    });

  }

  private extractBlogFromResponse(res: any): BlogDto | null {
    if (!res) {
      return null;
    }

    if (res.data?.id) {
      return res.data as BlogDto;
    }

    if (res.data?.data?.id) {
      return res.data.data as BlogDto;
    }

    if (res.id) {
      return res as BlogDto;
    }

    return null;
  }

  private extractBlogsFromResponse(res: any): BlogDto[] {
    if (Array.isArray(res?.data)) {
      return res.data as BlogDto[];
    }

    if (Array.isArray(res?.data?.data)) {
      return res.data.data as BlogDto[];
    }

    if (Array.isArray(res)) {
      return res as BlogDto[];
    }

    return [];
  }

}
