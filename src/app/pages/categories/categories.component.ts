import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICategory } from '../../core/services/category.service';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryCardComponent,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  private route = inject(ActivatedRoute);

  categories!:ICategory[];

  constructor(){
    this.categories = this.route.snapshot.data['categories'];
  }
}
