import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordService } from '../../../core/services/password.service';
import { NgClass, NgStyle } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-email',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle],
  templateUrl: './forgot-password-email.component.html',
  styleUrl: './forgot-password-email.component.css'
})
export class ForgotPasswordEmailComponent {
  private router = inject(Router);
  private passwordService = inject(PasswordService);

  emailForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email])
  })

  onSend(){
    this.passwordService.forgotPass(this.emailForm.controls.email.value as string).subscribe({
      next:(res) => {
        this.passwordService.$steps.set('step2');
        this.passwordService.setUserEmail(this.emailForm.controls.email.value as string);
        this.router.navigate(['forgot-password','reset-code']);
      },
      error: (err) => {
        this.emailForm.setErrors({
          auth: err.message
        })
      }
    });
  }
}
