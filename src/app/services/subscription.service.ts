import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SubscriptionRequest } from '../models/subscriptionRequest';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = environment.apiUrl + '/api/subscription';
  constructor(private http: HttpClient) { }
  subscribe(user: SubscriptionRequest): Observable<any> {
      return this.http.post(`${this.apiUrl}/create`, user);
    }
}
