import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-slider',
  standalone: true,
  imports: [],
  templateUrl: './banner-slider.component.html',
  styleUrl: './banner-slider.component.css'
})
export class BannerSliderComponent {
  images = [
    "/assets/images/banner-0.jpg",
    "/assets/images/banner-3.jpg",
    "/assets/images/banner-5.jpg",
    "/assets/images/banner-1.jpg",
    "/assets/images/banner-4.jpg",
    "/assets/images/banner-2.jpg"
  ]
}
