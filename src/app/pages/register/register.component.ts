import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService, IRegisterData } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle, NgClass, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private toastr = inject(ToastrService);
  private auth = inject(AuthService);
  private router = inject(Router);

  requestError = '';
  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&-_])[A-Za-z\d$@$!%*?&]/),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        (Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)),
      ]),
    },
    { validators: [this.passwordMatchValidator] }  as FormControlOptions
  );

  passwordMatchValidator(group: FormGroup){
    return group.get('password')?.value === group.get('rePassword')?.value ? null : {passwordMismatch : true};
  }

  onRegister(){
    this.auth.register(this.registerForm.value as IRegisterData).subscribe(
      {
        next:(res)=>{
          this.toastr.success('Welcome aboard! Your account has been created successfully.', 'Registration Successful!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-[#4ade80] success',titleClass:'font-bold text-md text-[#4ade80]',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          this.toastr.error(err.error.message, 'OOPS..!',{toastClass: 'ngx-toastr text-[1rem] bg-white border-l-8 border-red-500 danger',titleClass:'font-bold text-md text-red-500',messageClass:'text-black text-[12px] color-[#656565]',extendedTimeOut:5000,easing: 'ease-in',progressBar: true, closeButton: true, tapToDismiss:true,newestOnTop:false});
          this.requestError = err.error.message;
        }
    });
  }

}
