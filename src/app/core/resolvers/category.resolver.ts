import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { CategoryService, ICategory } from '../services/category.service';
import { catchError, map, Observable } from 'rxjs';

export const categoryResolver: ResolveFn<Observable<ICategory | boolean>> = (route, state) => {
  const router = inject(Router);
  return inject(CategoryService).getCategory(route.params['categoryId']).pipe(
    map(res => res.data),
    catchError(err => router.navigate(['/not-found']))
  );
};
