import { Component, OnInit } from '@angular/core';

import { SweetalertService } from '../../_services/sweetalert-service';
import { AboutDto } from '../../_models/aboutDto';
import { AboutService } from '../../_services/about-service';
declare const alertify: any;

@Component({
  selector: 'admin-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutAdmin implements OnInit {
  abouts: AboutDto[];
  newAbout: AboutDto = new AboutDto();
  editAbout: any = {};
  errors: any = [];

  constructor(private aboutService: AboutService, private swal: SweetalertService) {}

  ngOnInit(): void {
    this.getAbouts();
  }

  getAbouts() {
    this.aboutService.getAll().subscribe({
      next: (result) => (this.abouts = result.data),
      error: () => alertify.error('An Error Occured!')
    });
  }

  create() {
    this.errors = {};
    this.aboutService.create(this.newAbout).subscribe({
      next: (result) => this.abouts.push(result.data),
      error: (result) => {
        alertify.error('An Error Occured!');
        this.errors = result.error.errors;
      },
      complete: () => {
        alertify.success('About Created!');
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
  }

  onSelected(model) {
    this.errors = {};
    this.editAbout = model;
  }

  update() {
    this.aboutService.update(this.editAbout).subscribe({
      error: (result) => {
        alertify.error('An Error Occured!');
        this.errors = result.error.errors;
      },
      complete: () => {
        alertify.success('About Updated!');
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });
  }

  async delete(id) {
    const isConfirmed = await this.swal.areYouSure();

    if (isConfirmed) {
      this.aboutService.delete(id).subscribe({
        error: () => alertify.error('An Error Occured!'),
        complete: () => {
          alertify.success('About Deleted!');
          this.getAbouts();
        }
      });
    }
  }
}
