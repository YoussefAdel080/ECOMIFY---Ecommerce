import { Component, inject } from '@angular/core';
import { CartDataResponse, CartService } from '../../core/services/cart.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private cartService = inject(CartService);

  cartData!:CartDataResponse;
  cartProducts!:{
    count: number
    _id: string
    price: number
    product: IProduct}[]

  constructor(){
    this.cartData = this.route.snapshot.data['cartData'];
    this.cartProducts = this.cartData.data.products;
    this.cartService.$cartCount.next(this.cartData.numOfCartItems);
  }

  changeProductQuantity(e: any,val: number,productId: string){
    let inputElement = e.parentElement.parentElement.children[0];
    let productQuantity = parseInt(inputElement.value);

    this.cartService.changeCount(productId, (productQuantity+val).toString()).subscribe({
      next: (res) => {
        this.cartData = res;
        this.cartProducts = res.data.products;
        this.cartService.$cartCount.next(res.numOfCartItems);
        this.toastr.success('The item has been successfully updated in your cart.', 'Cart Updated!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-[#4ade80] success',titleClass:'font-bold text-md text-[#4ade80]',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
      },
      error: (err) => {
        this.toastr.error('Couldn’t add the item to your cart. Please check your connection and try again.', 'Add to Cart Failed',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
      }
    });
  }

  deleteProduct(id:string){
    this.cartService.deleteProduct(id).subscribe({
      next: (res) => {
        this.cartData = res;
        this.cartProducts = res.data.products;
        this.cartService.$cartCount.next(res.numOfCartItems);
        this.toastr.success('The item has been successfully removed from your cart.', 'Removed from Cart',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-[#4ade80] success',titleClass:'font-bold text-md text-[#4ade80]',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
      },
      error: (err) => {
        this.toastr.error('Couldn’t delete the item to your cart. Please check your connection and try again.', 'Remove from Cart Failed',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
      }
    })
  }

  clearCart(){
    this.cartService.clearCart().subscribe({
      next:(res) => {
        this.cartData = res;
        this.cartProducts = res.data.products;
        this.cartService.$cartCount.next(res.numOfCartItems);
        this.toastr.success('Your cart is now empty. Feel free to continue shopping!', 'Cart Cleared!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-[#4ade80] success',titleClass:'font-bold text-md text-[#4ade80]',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
      },
      error:(err) => {
        this.toastr.error('We couldn’t clear your cart. Please check your connection and try again.', 'Unable to Clear Cart',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
      }
    })
  }
}
