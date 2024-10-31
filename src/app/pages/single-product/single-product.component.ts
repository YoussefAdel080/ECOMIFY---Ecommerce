import { Component, inject } from '@angular/core';
import { ImageGalleryComponent } from "../../components/image-gallery/image-gallery.component";
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/services/products.service';
import { RatingDirective } from '../../core/directives/rating.directive';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [ImageGalleryComponent, RatingDirective, NgClass],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);

  product!:IProduct;
  inWishlist = false;
  productCount = 0;

  constructor(){
    this.product = this.route.snapshot.data["product"];
  }

  ngOnInit(): void {
    this.wishlistService.$wishlistProducts.subscribe(
      res => this.inWishlist = res.includes(this.product._id)
    );
  }

  toggleWishlist(){
    if(!this.inWishlist){
      this.wishlistService.addToWishlist(this.product._id).subscribe(
        {
          next: (res:any) => {
            this.wishlistService.$wishlistCount.next(res.data.length);
            this.wishlistService.$wishlistProducts.next(res.data);
            this.toastr.success('This item is now saved in your wishlist for later.', 'Added to Wishlist!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-[#4ade80] success',titleClass:'font-bold text-md text-[#4ade80]',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('There was an issue adding the item. Check your connection and try again.', 'Add to Wishlist Failed',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
          }
        }
      )
    }
    else{
      this.wishlistService.removeFromWishlist(this.product._id).subscribe(
        {
          next: (res) => {
            this.wishlistService.$wishlistCount.next(res.data.length);
            this.wishlistService.$wishlistProducts.next(res.data)
            this.toastr.success('This item is no longer in your wishlist.', 'Removed from Wishlist',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('There was an issue removing the item. Check your connection and try again.', 'Remove from Wishlist Failed',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
          }
        }
      )
    }

  }

  changeProductCount(num:number){
    if(this.productCount + num >= 0){
      this.productCount += num;
    }
  }

  addToCart(){
      this.cartService.addCart(this.product._id).subscribe({
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
