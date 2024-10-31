import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataRequestResponse, IBrand } from './brand.service';
import { ICategory } from './category.service';

export interface IProduct{
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private rootUrl = 'https://ecommerce.routemisr.com/api/v1/products';

  constructor() { }

  getAllProducts(pageNumber:number=1,limit:number=100){
    return this.http.get<DataRequestResponse<IProduct>>(`${this.rootUrl}?page=${pageNumber} &limit=${limit}`);
  }

  getProduct(productId: string){
    return this.http.get<{data:IProduct}>(`${this.rootUrl}/${productId}`);
  }
}
