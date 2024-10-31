import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let loggedIn = false;
  inject(AuthService).$isLoggedIn.subscribe(
    res => {loggedIn = res;}
  );
  if(!loggedIn){
    inject(Router).navigate(['/login']);
  }
  return loggedIn;
};