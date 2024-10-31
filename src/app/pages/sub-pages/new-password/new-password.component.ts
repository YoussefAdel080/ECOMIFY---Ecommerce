import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordService } from '../../../core/services/password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgStyle],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  private router = inject(Router);
  private passwordService = inject(PasswordService);

  email!:string;

  ngOnInit(): void {
    if(this.passwordService.$steps.getValue() == 'step1'){
      this.router.navigate(['forgot-password'])
    }
    else if(this.passwordService.$steps.getValue() == 'step2'){
      this.router.navigate(['forgot-password','reset-code']);
    }

    this.passwordService.$userEmail.subscribe(
      res => this.email = res
    )
  }

  newPassForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&-_])[A-Za-z\d$@$!%*?&]/),
    ]),
  });

  onSubmit(){
    this.passwordService.newPass(this.email,this.newPassForm.controls.newPassword.value as string).subscribe({
      next: (res) => {
        if (res.token !== null) {
          this.router.navigate(['/login']);
        }
      },
      error:(err) => {
        console.log(err)
      }
    })
  }
}
