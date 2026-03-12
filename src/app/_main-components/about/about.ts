import { Component, OnInit } from '@angular/core';
import { AboutDto } from '../../_models/aboutDto';
import { AboutService } from '../../_services/about-service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  about: AboutDto = {
    id: null,
    title: 'About Us',
    description: 'We build a modern publishing experience where quality content meets simple, clean technology.',
    imageUrl: 'assets/img/about-company-1.jpg'
  };

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAll().subscribe({
      next: (result) => {
        if (result.data && result.data.length > 0) {
          this.about = result.data[0];
        }
      }
    });
  }
}
