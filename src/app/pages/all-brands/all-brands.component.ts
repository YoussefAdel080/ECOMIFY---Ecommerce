import { Component, inject } from '@angular/core';
import { IBrand } from '../../core/services/brand.service';
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

  allBrands!:IBrand[];

  constructor(){
    this.allBrands = this.route.snapshot.data['allBrands'];
  }
}
