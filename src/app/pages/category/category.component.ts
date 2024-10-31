import { Component, inject } from '@angular/core';
import { ICategory } from '../../core/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/services/products.service';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  private route = inject(ActivatedRoute);

  category!:ICategory;
  products!:IProduct[];
  filteredProducts!:IProduct[];
  filter = '';

  constructor(){
    this.category = this.route.snapshot.data['category'];
    this.products = this.route.snapshot.data['products'];
  }

  ngOnInit(): void {
    this.products = this.products.filter(
      product => product.category._id == this.category._id
    )

    this.filteredProducts = this.products;

  }

  filterProducts(){
    if(!this.filter){
      this.filteredProducts = this.products;
    }else{
      this.filteredProducts = this.filteredProducts.filter(
        product => product.title.toLowerCase().includes(this.filter.toLowerCase())
      )
    }

  }
}
