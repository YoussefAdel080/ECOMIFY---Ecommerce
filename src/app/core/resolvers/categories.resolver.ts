import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { CategoryService, ICategory } from '../services/category.service';
import { catchError, map } from 'rxjs';

export const categoriesResolver: ResolveFn<ICategory[] | boolean> = (route, state) => {
  return inject(CategoryService).getAllCategories().pipe(
    map(res => res.data),
    catchError(err => inject(Router).navigate(['/not-found']))
  );
};
