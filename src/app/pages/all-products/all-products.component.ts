import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/services/products.service';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  private route = inject(ActivatedRoute);

  products!:IProduct[];
  filteredProducts!:IProduct[];
  filter = '';

  constructor(){
    this.products = this.route.snapshot.data['products'];
    this.filteredProducts = this.products;
  }

  filterProducts(){
    if(!this.filter){
      this.filteredProducts = this.products;
    }else{
      this.filteredProducts = this.products.filter(
        product => product.title.toLowerCase().includes(this.filter.toLowerCase())
      )
    }
  }
}
