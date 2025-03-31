import { Component } from '@angular/core';
import { RegisterUserRequest } from '../../models/registerUserRequest';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatCardModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user = { email: '', firstName: '', lastName: '', password: '',phoneNumber:'',addressLine1:'',city:'',state:'',postalCode:'',country:'' };
  constructor(private authService: AuthService,private spinner: NgxSpinnerService) { }
  onRegister() {
    this.spinner.show();
    let registerUserReq: RegisterUserRequest = {
      FirstName: this.user.firstName,
      LastName: this.user.lastName,
      Email: this.user.email,
      PasswordHash: this.authService.hashPassword(this.user.password),
      Role: "User",
      PhoneNumber:this.user.phoneNumber,
      AddressLine1:this.user.addressLine1,
      City:this.user.city,
      Country:this.user.country,
      PostalCode:this.user.postalCode,
      State:this.user.state
    };

    this.authService.register(registerUserReq).subscribe({
      next: (response) => {
        debugger;
        this.spinner.hide(); 
        alert(response.message);
      },
      error: (err) => {this.spinner.hide(); alert(err.error);},
    });
  }
}
