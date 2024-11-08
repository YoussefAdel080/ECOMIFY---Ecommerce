import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { productResolver } from './core/resolvers/product.resolver';
import { cartResolver } from './core/resolvers/cart.resolver';
import { categoriesResolver } from './core/resolvers/categories.resolver';
import { productsResolver } from './core/resolvers/products.resolver';
import { categoryResolver } from './core/resolvers/category.resolver';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ForgotPasswordEmailComponent } from './pages/sub-pages/forgot-password-email/forgot-password-email.component';
import { ResetCodeComponent } from './pages/sub-pages/reset-code/reset-code.component';
import { NewPasswordComponent } from './pages/sub-pages/new-password/new-password.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'all-brands',
    loadComponent: () => import('./pages/all-brands/all-brands.component').then(m => m.AllBrandsComponent)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
    canActivate: [
      authGuard
    ]
  },
  {
    path: 'single-product/:id',
    loadComponent: () => import('./pages/single-product/single-product.component').then(m => m.SingleProductComponent),
    resolve: {
      product : productResolver
    }
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
    canActivate: [
      authGuard
    ],
    resolve:{
      cartData : cartResolver
    }
  },
  {
    path: 'checkout/:cartId',
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate:[
      authGuard
    ],resolve:{
      cartData : cartResolver
    }
  },
  {
    path: 'all-categories',
    loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
    resolve:{
      categories : categoriesResolver
    }
  },
  {
    path: 'category/:categoryId',
    loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent),
    resolve:{
      products : productsResolver,
      category : categoryResolver
    }
  },
  {
    path: 'all-products',
    loadComponent: () => import('./pages/all-products/all-products.component').then(m => m.AllProductsComponent),
    resolve:{
      products : productsResolver
    }
  },
  {
    path: 'forgot-password',
    component:ForgotPasswordComponent,
    children:[
      {path: '',component: ForgotPasswordEmailComponent},
      {path: 'reset-code',component: ResetCodeComponent},
      {path: 'new-password',component: NewPasswordComponent}
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
