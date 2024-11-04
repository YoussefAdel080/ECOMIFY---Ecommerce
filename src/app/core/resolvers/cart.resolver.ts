import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { CartDataResponse, CartService } from '../services/cart.service';
import { catchError, Observable } from 'rxjs';

export const cartResolver: ResolveFn<Observable<CartDataResponse | boolean>> = (route, state) => {
  const router = inject(Router);
  return inject(CartService).getCart().pipe(
    catchError(err => router.navigate(['not-found']))
  )
};
