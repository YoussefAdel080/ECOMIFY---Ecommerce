import { Component, inject, Signal } from '@angular/core';
import { BrandService, IBrand } from '../../core/services/brand.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-brands',
  standalone: true,
  imports: [],
  templateUrl: './all-brands.component.html',
  styleUrl: './all-brands.component.css'
})
export class AllBrandsComponent {
  private route = inject(ActivatedRoute);
  private brandsService = inject(BrandService);

  allBrands:Signal<IBrand[]> = this.brandsService.allBrands;
}
