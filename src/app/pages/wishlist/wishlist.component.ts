import { Component, inject } from '@angular/core';
import { IProduct } from '../../core/services/products.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  private wishlistService = inject(WishlistService);

  wishlistProducts!:IProduct[];

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe(
      res => this.wishlistProducts = res.data
    )
  }
  
}
