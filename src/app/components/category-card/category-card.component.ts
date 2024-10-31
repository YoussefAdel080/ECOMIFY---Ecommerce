import { Component, input } from '@angular/core';
import { ICategory } from '../../core/services/category.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  category = input<ICategory>();

  constructor(){

  }
}
