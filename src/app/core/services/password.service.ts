import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthRegisterResponse } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private http = inject(HttpClient);
  private rootUrl = 'https://ecommerce.routemisr.com';

  private userEmail = signal<string>('');
  $userEmail = this.userEmail.asReadonly();
  $steps = signal<string>('step1');

  setUserEmail(email:string){
    this.userEmail.set(email);
  }

  constructor() { }

  forgotPass(email: string){
    return this.http.post(
      this.rootUrl + '/api/v1/auth/forgotPasswords',
      { email: email }
    );
  }
  resetCode(resetCode: string){
    return this.http.post(
      this.rootUrl + '/api/v1/auth/verifyResetCode',
      { resetCode: resetCode }
    );
  }
  newPass(email: string, newPassword: string){
    return this.http.put<AuthRegisterResponse>(this.rootUrl + '/api/v1/auth/resetPassword', {
      email: email,
      newPassword: newPassword,
    });
  }

  updatePass(userData:object){
    return this.http.put(this.rootUrl + '/api/v1/users/updateMe/',{userData});
  }
}
