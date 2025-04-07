import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SubscriptionRequest } from '../models/subscriptionRequest';
import { CancelSubscriptionRequest } from '../models/cancelSubscriptionRequest';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = environment.apiUrl + '/api/subscription';
  constructor(private http: HttpClient) { }
  subscribe(user: SubscriptionRequest): Observable<any> {
      return this.http.post(`${this.apiUrl}/create`, user);
    }
    cancelSubscription(model:CancelSubscriptionRequest): Observable<any>
    {
      return this.http.post(`${this.apiUrl}/cancel`, model);
    }
}
