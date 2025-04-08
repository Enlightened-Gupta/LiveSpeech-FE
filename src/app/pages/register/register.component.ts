import { Component } from '@angular/core';
import { RegisterUserRequest } from '../../models/registerUserRequest';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { UserLoginRequest } from '../../models/userRequest';
import { Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, CommonModule,MatCheckbox],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = { email: '', firstName: '', lastName: '', password: '', phoneNumber: '', city: '', state: '', country: '', confirmPassword: '',isAgreed:false };
  constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router) { }
  onRegister() {
    this.spinner.show();
    let registerUserReq: RegisterUserRequest = {
      FirstName: this.user.firstName,
      LastName: this.user.lastName,
      Email: this.user.email,
      PasswordHash: this.authService.hashPassword(this.user.password),
      Role: "User",
      PhoneNumber: this.user.phoneNumber,
      AddressLine1: "",
      City: this.user.city,
      Country: this.user.country,
      PostalCode: "",
      State: this.user.state,
      IsAgreed:this.user.isAgreed
    };

    this.authService.register(registerUserReq).subscribe({
      next: (response) => {
        //debugger;
        this.spinner.hide();
        const userRequest: UserLoginRequest = {
          Email: registerUserReq.Email,
          PasswordHash: registerUserReq.PasswordHash
        };
        this.spinner.show();
        this.authService.login(userRequest).subscribe({
          next: (res) => {
            this.spinner.hide();
            alert(response.message);
            this.router.navigate(['live']);
          },// this.router.navigate(['#/live']),
          error: exp => {
            this.spinner.hide();
            alert(exp.error.message);
          }
        });
        
      },
      error: (err) => { 
        this.spinner.hide(); 
        alert(err.error.message); 
      },
    });
  }
}
