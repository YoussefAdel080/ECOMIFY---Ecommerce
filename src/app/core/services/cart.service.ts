import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IProduct } from './products.service';

export interface CartDataResponse {
  status: string
  cartId: string
  numOfCartItems: number
  data: {
    cartOwner: string
    createdAt: string
    updatedAt: string
    products: {
      count: number
      _id: string
      price: number
      product: IProduct
    }[]
    totalCartPrice: number
    __v: number
  }
}

export interface paymentResponse {
  status: string
  session: Session
}

export interface Session {
  url: string
  success_url: string
  cancel_url: string
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private rootUrl = 'https://ecommerce.routemisr.com/api/v1/cart';

  $cartCount = new BehaviorSubject<number>(0);
  constructor() { }

  addCart(productId: string) {
    return this.http.post<CartDataResponse>(this.rootUrl, {
      productId: productId,
    });
  }
  getCart() {
    return this.http.get<CartDataResponse>(this.rootUrl);
  }

  deleteProduct(productId: string) {
    return this.http.delete<CartDataResponse>(`${this.rootUrl}/${productId}`);
  }

  clearCart() {
    return this.http.delete<CartDataResponse>(this.rootUrl);
  }

  changeCount(productId: string, count: string) {
    return this.http.put<CartDataResponse>(`${this.rootUrl}/${productId}`, {
      count: count,
    });
  }

  payment(cartId: string, shippingAddress: object) {
    return this.http.post<paymentResponse>(
      'https://ecommerce.routemisr.com' +
        `/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shippingAddress }
    );
  }

  payCash(cartId: string, shippingAddress: object) {
    return this.http.post(`https://route-ecommerce.onrender.com/api/v1/orders/${cartId}`, {
      shippingAddress: shippingAddress,
    });
  }

}
