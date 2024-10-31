import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { BrandService, IBrand } from '../services/brand.service';
import { catchError, map, Observable } from 'rxjs';

export const brandsResolver: ResolveFn<Observable<IBrand[] | boolean>> = (route, state) => {
  return inject(BrandService).getAllBrands().pipe(
    map(res => res.data),
    catchError(err => inject(Router).navigate(['not-found']))
  );
};
