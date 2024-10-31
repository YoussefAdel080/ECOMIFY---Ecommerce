import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('_token') !== null) {
    const myToken: any = localStorage.getItem('_token');
    req = req.clone({
      setHeaders: { token: myToken },
    });
  }
  return next(req);
};
