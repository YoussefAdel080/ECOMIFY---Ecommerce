import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations:[
    trigger('openClose', [
      state(
        'opened',
        style({
          transform : 'translateX(0)',
          opacity: '1'
        }),
      ),
      state(
        'closed',
        style({
          transform : 'translateX(100%)',
          opacity: '0'
        }),
      ),
      transition('opened <=> closed', [animate('.5s ease-in')])
    ])
  ]
})
export class HeaderComponent {
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private auth = inject(AuthService);
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);

  menuState : 'closed' | 'opened' = 'closed';

  loggedIn!:boolean;
  wishlistCount!:number;
  cartCount!:number;

  ngOnInit(): void {
    this.loggedIn = this.auth.$isLoggedIn();
    if(this.loggedIn){
        this.wishlistService.getWishlist().subscribe({
        next:(res) => {
          this.wishlistService.$wishlistCount.next(res.count);
          this.wishlistService.$wishlistProducts.next(res.data.map(p => p._id));
        },error:(err) =>{
          console.log(err);
          this.router.navigate(['/not-found']);
        }
      })

      this.wishlistService.$wishlistCount.subscribe(
        res => this.wishlistCount = res
      )

      this.cartService.getCart().subscribe({
        next:(res) => {
          this.cartService.$cartCount.next(res.numOfCartItems);
        },
        error:(err) => {this.router.navigate(['/not-found']);}
      })

      this.cartService.$cartCount.subscribe(
        res => {this.cartCount= res;}
      )
    }
  }

  onLogOut(){
    localStorage.removeItem('_token');
    this.auth.setIsLoggedIn(false);
    this.router.navigate(['/login']);
    this.toastr.success('You have successfully logged out. We hope to see you again soon!', 'Goodbye!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-[#4ade80] success',titleClass:'font-bold text-md text-[#4ade80]',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
  }

}
