import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataRequestResponse, IBrand, Metadata } from './brand.service';

export interface ICategory extends IBrand {

}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private rootUrl = 'https://ecommerce.routemisr.com/api/v1/categories'

  constructor() { }

  getAllCategories(){
    return this.http.get<DataRequestResponse<ICategory>>(`${this.rootUrl}`);
  }

  getCategoryProduct(categoryId: string){
    return this.http.get<DataRequestResponse<ICategory>>(`${this.rootUrl}/${categoryId}/subcategories`);
  }

  getCategory(categoryId: string){
    return this.http.get<{
      results: number;
      metadata: Metadata;
      data : ICategory
    }>(`${this.rootUrl}/${categoryId}`);
  }
}
