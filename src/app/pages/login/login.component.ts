import { Component, inject } from '@angular/core';
import { AuthService, ILoginData } from '../../core/services/auth.service';
import {FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private toastr = inject(ToastrService);
  private auth = inject(AuthService);
  private router = inject(Router);

  requestError = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&]/),
    ]),
  });


  onLogin(){
    this.auth.login(this.loginForm.value as ILoginData).subscribe({
      next:(res)=>{
        localStorage.setItem('_token', res.token);
        this.auth.setUserData();
        this.toastr.success('You’re logged in and ready to explore.', 'Good to See You!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-[#4ade80] success',titleClass:'font-bold text-md text-[#4ade80]',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
        this.router.navigate(['/home']);
      },
      error:(err)=>{
        this.toastr.error(err.error.message, 'OOPS..!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
        this.requestError = err.error.message;

      }
    })
  }
}
