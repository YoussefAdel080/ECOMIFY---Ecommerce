import { Component, inject } from '@angular/core';
import { BannerSliderComponent } from "../../components/banner-slider/banner-slider.component";
import { BrandService, IBrand } from '../../core/services/brand.service';
import { RouterLink } from '@angular/router';
import { CardsSliderComponent } from "../../components/cards-slider/cards-slider.component";
import { CategoryService, ICategory } from '../../core/services/category.service';
import { CategoryCardComponent } from "../../components/category-card/category-card.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { IProduct, ProductsService } from '../../core/services/products.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerSliderComponent, CardsSliderComponent, CategoryCardComponent, ProductCardComponent, NgClass,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private brandsService = inject(BrandService);
  private categoryService = inject(CategoryService);
  private productsService = inject(ProductsService);

  allBrands!:IBrand[];
  categories !:ICategory[];
  products!:IProduct[];
  productsPages = 0
  currentPage = 1;
  pagesToShow!:number[];
  showLoadingSpinner = false;
  constructor(){

  }

  ngOnInit(): void {
    window.onscroll = function() {
      var el = document.getElementById("brands");
      var scrollTop = document.documentElement.scrollTop * 0.5;
      if(el){
        el.style.transform =
        "translateX(-" + scrollTop + "px)";
      }
    };

    this.brandsService.getAllBrands().subscribe(
      (res) => {this.allBrands = res.data}
    );

    this.categoryService.getAllCategories().subscribe(
      (res) => {this.categories = res.data}
    )

    this.productsService.getAllProducts(1,9).subscribe(
      (res) => {
        this.products =  res.data;
        this.productsPages = res.metadata.numberOfPages;
        this.currentPage = res.metadata.currentPage;
        this.pagesToShow = []
          for(let i = 1;i <= 5;i++){
            this.pagesToShow.push(i);
          }
      }
    )
  }

  getProducts(pageNumber : number){
    this.showLoadingSpinner = true;
    this.products = []
    this.productsService.getAllProducts(pageNumber,9).subscribe(
      (res) => {
        this.products =  res.data;
        this.productsPages = res.metadata.numberOfPages;
        this.currentPage = res.metadata.currentPage;
        this.showLoadingSpinner = false
        if(this.currentPage+4 <= this.productsPages){
          this.pagesToShow = []
          for(let i =this.currentPage;i < this.currentPage+5;i++){
            this.pagesToShow.push(i);
          }
        }
      }
    )
  }
}
