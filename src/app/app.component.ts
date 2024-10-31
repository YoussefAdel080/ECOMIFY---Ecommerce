import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { initFlowbite } from 'flowbite'
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private auth = inject(AuthService);

  title = 'Ecommerce';

  ngOnInit(): void {
    initFlowbite();

    if(localStorage.getItem('_token') != null){
      this.auth.setUserData();
    }
  }
}
