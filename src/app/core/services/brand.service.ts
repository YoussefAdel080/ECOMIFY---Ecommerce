import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
  private http = inject(HttpClient);
  private rootUrl = 'https://ecommerce.routemisr.com/api/v1/brands';

  constructor() { }

  getAllBrands() {
    return this.http.get<DataRequestResponse<IBrand>>(`${this.rootUrl}`);
  }

  getBrand(brandId: string) {
    return this.http.get<IBrand>(
      `${this.rootUrl}/${brandId}`
    );
  }
}
