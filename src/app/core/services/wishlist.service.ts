import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from './products.service';
import { BehaviorSubject } from 'rxjs';

export interface wishlistDataResponse{
  count : number;
  data : IProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient);
  private rootUrl = 'https://ecommerce.routemisr.com';

  $wishlistCount = new BehaviorSubject<number>(0);
  $wishlistProducts = new BehaviorSubject<string[]>([]);


  addToWishlist(productId: string) {
    return this.http.post<{
      data:string[];
      message:string;
      status:string
    }>(
      this.rootUrl + '/api/v1/wishlist',
      {
        productId: productId,
      }
    );
  }

  getWishlist(){
    return this.http.get<wishlistDataResponse>(this.rootUrl + '/api/v1/wishlist');
  }

  removeFromWishlist(productId: string) {
    return this.http.delete<{
      data:string[];
      message:string;
      status:string
    }>(
      this.rootUrl + `/api/v1/wishlist/${productId}`
    );
  }

}
