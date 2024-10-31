import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../core/services/products.service';
import { RatingDirective } from '../../core/directives/rating.directive';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, RatingDirective, NgClass],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  private toastr = inject(ToastrService);
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);

  product = input<IProduct>();
  inWishlist!:boolean;

  ngOnInit(): void {
    this.wishlistService.$wishlistProducts.subscribe(
      res => this.inWishlist = res.includes(this.product()?._id as string)
    );
  }

  toggleWishlist(){
    if(!this.inWishlist){
      this.wishlistService.addToWishlist(this.product()?._id as string).subscribe(
        {
          next: (res) => {
            this.wishlistService.$wishlistCount.next(res.data.length);
            this.wishlistService.$wishlistProducts.next(res.data);
            this.toastr.success('This item is now saved in your wishlist for later.', 'Added to Wishlist!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-[#4ade80] success',titleClass:'font-bold text-md text-[#4ade80]',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
            console.log(res)
          },
          error: (err) => {
            this.toastr.error('There was an issue adding the item. Check your connection and try again.', 'Add to Wishlist Failed',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
            console.log(err);
          }
        }
      )
    }
    else{
      this.wishlistService.removeFromWishlist(this.product()?._id as string).subscribe(
        {
          next: (res) => {
            this.wishlistService.$wishlistCount.next(res.data.length);
            this.wishlistService.$wishlistProducts.next(res.data)
            this.toastr.success('This item is no longer in your wishlist.', 'Removed from Wishlist',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
            console.log(res)
          },
          error: (err) => {
            this.toastr.error('There was an issue removing the item. Check your connection and try again.', 'Remove from Wishlist Failed',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
          }
        }
      )
    }

  }

  addToCart(){
      this.cartService.addCart(this.product()?._id as string).subscribe({
        next: (res) => {
          this.cartService.$cartCount.next(res.numOfCartItems);
          this.toastr.success('The item has been successfully added to your cart.', 'Added to Cart!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-[#4ade80] success',titleClass:'font-bold text-md text-[#4ade80]',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
        },
        error: (err) => {
          this.toastr.error('Couldn’t add the item to your cart. Please check your connection and try again.', 'Add to Cart Failed',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
        }
      })
  }
}
