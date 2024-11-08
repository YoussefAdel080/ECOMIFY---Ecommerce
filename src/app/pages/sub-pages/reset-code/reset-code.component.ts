import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from '../../../core/services/password.service';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.css'
})
export class ResetCodeComponent {
  private router = inject(Router);
  private passwordService = inject(PasswordService);

  resetCodeForm = new FormGroup({
    resetCode : new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
    if(this.passwordService.$steps() != 'step2'){
      this.router.navigate(['forgot-password'])
    }
  }

  onSubmit(){
    this.passwordService.resetCode(this.resetCodeForm.controls.resetCode.value as string).subscribe({
      next:(res) => {
        this.passwordService.$steps.set('step3');
      },
      error:(err) => {
        console.log(err);
        this.resetCodeForm.setErrors({
          code: err.message
        })
      }
    })
  }
}
