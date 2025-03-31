// import { Component } from '@angular/core';
// import { environment } from '../../../environments/environment';
import { Component, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { NgxStripeModule } from 'ngx-stripe';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionRequest } from '../../models/subscriptionRequest';
@Component({
  selector: 'app-subscription',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, CommonModule, MatRadioModule, NgxStripeModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  selectedPlan: string = 'monthly';
  nameOnTheCard: string = '';
  // Stripe Card Options
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '400',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '16px',
        '::placeholder': { color: '#CFD7E0' }
      }
    }
  };
  // Stripe Elements Options
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  constructor(private stripeService: StripeService, private subscriptionSrvice: SubscriptionService) { }
  // Show payment form only for paid plans
  get showPaymentForm(): boolean {
    return this.selectedPlan === 'monthly' || this.selectedPlan === 'yearly';
  }

  // Handle plan selection
  onPlanSelect(plan: string) {
    this.selectedPlan = plan;
  }

  // Submit Subscription
  submitSubscription(stripeCard: StripeCardComponent) {
    console.log('Selected Plan:', this.selectedPlan);

    if (this.showPaymentForm) {
      debugger;
      // Create Stripe Payment Method
      this.stripeService
        .createToken(stripeCard.element, { name: this.nameOnTheCard })
        .subscribe((result) => {
          if (result.token) {
            // debugger;
            let request: SubscriptionRequest = {
              Name: this.nameOnTheCard,
              Plan: this.selectedPlan,
              StripeToken: result.token.id
            };
            this.subscriptionSrvice.subscribe(request).subscribe(
              {
                next: (res: any) => {
                  // debugger;
                  alert(res.message);
                },
                error: (err) => {
                  // debugger;
                  alert('Subscription failed: ' + err.message)
                }
              });
          } else {
            alert('Error in capturing payment info: ' + result.error.message);
          }
        });
    } else {
      alert('Subscribed to Free Trial!');
    }
  }
}
