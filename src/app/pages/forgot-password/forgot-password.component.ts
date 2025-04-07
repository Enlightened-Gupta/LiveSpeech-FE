import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordRequest } from '../../models/forgotPasswordRequest';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService,private spinner: NgxSpinnerService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{ validator: this.passwordsMatchValidator });
  }
  get email() {
    return this.forgotPasswordForm.get('email');
  }

  get password() {
    return this.forgotPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.forgotPasswordForm.get('confirmPassword');
  }

  get passwordMismatch(): boolean {
    let val=this.password?.value !== this.confirmPassword?.value;
    return val;
  }
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }
  onSubmit() {
    if (this.forgotPasswordForm.valid && !this.passwordMismatch) {
      const hashedPassword = this.authService.hashPassword(this.password?.value);
      const confirmPassword = this.authService.hashPassword(this.confirmPassword?.value);
            const request: ForgotPasswordRequest = {
              Email: this.email?.value,
              PasswordHash: hashedPassword,
              ConfirmPassword:confirmPassword
              // FirstName:"",
              // LastName:""
            };
            this.authService.forgotPassword(request).subscribe({
              next: (response) => {
                // debugger;
                this.spinner.hide(); 
                alert(response.message);
              },
              error: (err) => {
                // debugger;
                this.spinner.hide(); 
                alert(err.error.text);
              }
            });
      //const { email, password } = this.forgotPasswordForm.value;

      // Call your API to reset password
      //console.log('Resetting password for:', email, password);
    }
  }
}
