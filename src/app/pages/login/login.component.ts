import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule, FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms'
import { UserLoginRequest } from '../../models/userRequest';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgxSpinnerService } from "ngx-spinner";
// import * as bcrypt from 'bcryptjs';
// import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;


  // username = '';
  // password = '';

  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      //agreement: ['', Validators.required],
    });
  }
  get username() {
    return this.loginForm.get('username')?.value;
  }

  get password() {
    return this.loginForm.get('password')?.value;
  }
  isFormValid(): boolean {
    return this.loginForm.valid;
  }
  async onSubmit() {
    if (this.isFormValid()) {
      this.spinner.show();
      //const saltRounds = 10;
      const hashedPassword = this.authService.hashPassword(this.password);// crypto.SHA256(this.password).toString();// await bcrypt.hash(this.password, saltRounds);
      const userRequest: UserLoginRequest = {
        Email: this.username,
        PasswordHash: hashedPassword
        // FirstName:"",
        // LastName:""
      };
      this.authService.login(userRequest).subscribe({
        next: (res) => { 
          this.spinner.hide(); 
          this.router.navigate(['live']); 
        },// this.router.navigate(['#/live']),
        error: err => { 
          this.spinner.hide(); 
          alert(err.error); }
      });
    }

  }
}
