import {  AfterViewInit, Component, OnInit } from '@angular/core';import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import AOS from 'aos';
import { BlogService } from '../../_services/blog-service';
import { BlogDto } from '../../_models/blog';
import { CategoryService } from '../../_services/category-service';
import { CategoryDto } from '../../_models/category';
import Swiper from 'swiper';
import { AboutService } from '../../_services/about-service';
import { AboutDto } from '../../_models/aboutDto';

@Component({
  selector: 'home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, AfterViewInit  {
  swiper: any;
  isMobileMenuOpen = false;
  latestBlogs: BlogDto[];
  categoriesWithBlogs: CategoryDto[];
aboutPreview: AboutDto = {
    id: null,
    title: 'Hakkımızda',
    description: 'ZenBlog; güçlü içerik, sade tasarım ve yüksek okunabilirlik odaklı modern bir yayın deneyimi sunar.',
    imageUrl: 'assets/img/about-company-1.jpg'
  };
  constructor(private blogService: BlogService,
              private categoryService: CategoryService,
              private aboutService: AboutService
  ){

  }

ngOnInit() {

  this.getLatest5Blogs();
  this.getCategoriesWithBlogs();
this.getAboutPreview();


    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
// Initialize Swiper
    this.swiper = new Swiper('.init-swiper', {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });


    // Handle scroll top button
    window.addEventListener('scroll', () => {
      const scrollTop = document.querySelector('.scroll-top');
      if (scrollTop) {
        if (window.scrollY > 100) {
          scrollTop.classList.add('active');
        } else {
          scrollTop.classList.remove('active');
        }
      }
    });
  }

  ngAfterViewInit() {
    // Remove preloader after view is initialized

    const preloader = document.querySelector('#preloader');
    if (preloader) {
      preloader.remove();
    }


  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    const navmenu = document.querySelector('#navmenu');
    if (navmenu) {
      if (this.isMobileMenuOpen) {
        navmenu.classList.add('mobile-nav-active');
      } else {
        navmenu.classList.remove('mobile-nav-active');
      }
    }
  }

  getLatest5Blogs(){
    this.blogService.getLatest5Blogs().subscribe({
       next: result => this.latestBlogs= result.data
    })
  }

  getCategoriesWithBlogs(){
    this.categoryService.getCategories().subscribe({
      next: result => this.categoriesWithBlogs = result.data
    })
  }
getAboutPreview(){
    this.aboutService.getAll().subscribe({
      next: result => {
        if(result.data && result.data.length > 0){
          this.aboutPreview = result.data[0];
        }
      }
    })
  }



}
