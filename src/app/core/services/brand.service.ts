import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';

export interface DataRequestResponse<T>{
  results: number;
  metadata: Metadata;
  data: T[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private router = inject(Router)
  private http = inject(HttpClient);
  private rootUrl = 'https://ecommerce.routemisr.com/api/v1/brands';

  constructor() { }

  allBrands = toSignal(this.http.get<DataRequestResponse<IBrand>>(`${this.rootUrl}`).pipe(
      map(res => res.data),
      catchError((err) => {
        this.router.navigate(['not-found']);
        return []
      })
    ),{initialValue : []});
}
