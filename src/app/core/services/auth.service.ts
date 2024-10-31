import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface ILoginData{
  email: string;
  password : string;
}


export interface AuthRegisterResponse{
  message: string;
  user: IUser;
  token: string;
  statusMsg:string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private rootUrl = 'https://ecommerce.routemisr.com';

  private userInfo : any = {}
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  $isLoggedIn = this.isLoggedIn.asObservable();

  constructor() { }

  register(registerData: IRegisterData){
    return this.http.post<AuthRegisterResponse>(`${this.rootUrl}/api/v1/auth/signup`,registerData);
  }

  login(loginData :ILoginData){
    return this.http.post<AuthRegisterResponse>(`${this.rootUrl}/api/v1/auth/signin`,loginData);
  }

  setUserData(): void {
    const encode = localStorage.getItem('_token');
    if (encode) {
      const decode = new JwtHelperService().decodeToken(encode);
      this.userInfo = decode;
    }
    this.isLoggedIn.next(true);
  }

  get userData(){
    return this.userInfo;
  }
}
