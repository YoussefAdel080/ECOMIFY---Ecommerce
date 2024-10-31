import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SingleProductComponent } from "../single-product/single-product.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, SingleProductComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
