import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [NgClass],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent {
  images = input<string[]>([]);

  currentImage = 0;
}
