import { Component, inject } from '@angular/core';
import { CartDataResponse, CartService } from '../../core/services/cart.service';
import { IProduct } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, NgStyle],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);

  cartData!:CartDataResponse;
  cartProducts!:{
    count: number
    _id: string
    price: number
    product: IProduct}[]

  billingForm = new FormGroup({
    address: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl('',Validators.required),
  });

  constructor(){
    this.cartData = this.route.snapshot.data['cartData'];
    this.cartProducts = this.cartData.data.products;
  }

  checkout(billingInfo : FormGroup, cartId: string){
    this.cartService.payment(cartId,billingInfo.value).subscribe({
      next: (res) => {
        window.open(res.session.url, '_self');
      },
      error: (err) => {console.log(err)}
    });
  }
}
