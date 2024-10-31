import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { IProduct, ProductsService } from '../services/products.service';
import { catchError, map, Observable } from 'rxjs';

export const productsResolver: ResolveFn<Observable<IProduct[] | boolean>> = (route, state) => {
  return inject(ProductsService).getAllProducts().pipe(
    map(res => res.data),
    catchError(err => inject(Router).navigate(['/not-found']))
  );
};
