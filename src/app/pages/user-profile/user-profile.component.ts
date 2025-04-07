import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { CommonModule } from '@angular/common';
import { CancelSubscriptionRequest } from '../../models/cancelSubscriptionRequest';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any;
  isLoggedIn:boolean=false;
  constructor(private authService: AuthService,private subscriptionSrvice: SubscriptionService) {

  }
  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        // debugger;
        this.user = data;
      },
      error: (err) => console.error('Error fetching profile:', err),
    });
  }
  cancelSubscription() {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      let model:CancelSubscriptionRequest={Email:this.user.email.toString()};
      this.subscriptionSrvice.cancelSubscription(model).subscribe({
        next: () => {
          alert('Subscription canceled successfully.');
          this.user.subscriptionType = 'Cancelled';
        },
        error: () => alert('Failed to cancel subscription.'),
      });
    }
  }
}
