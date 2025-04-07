import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../models/authResponse';
import { environment } from '../../environments/environment';
import { UserLoginRequest } from '../models/userRequest';
import * as crypto from 'crypto-js';
import { jwtDecode } from 'jwt-decode';
import { ForgotPasswordRequest } from '../models/forgotPasswordRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserAuthenticated:boolean=false;
  public trialDaysLeft:number=0;
  public showTrialStrip:boolean=false;
  private apiUrl = environment.apiUrl + '/api/auth';
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  forgotPassword(request: ForgotPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgotpassword`, request);
  }

  login(credentials: UserLoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      map((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.token);
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  hashPassword(password: string): string {
    return crypto.SHA256(password).toString(); // Generates SHA-256 hash
  }
  isAuthenticated(): boolean {
    this.isUserAuthenticated=!!this.getToken();
    return !!this.getToken();
  }
  getUserRole()
  {
    const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          return decoded.Role || ''; // Extract the role from token
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
      return '';
  }
  isSubscriptionAvailable()
  {
    var serviceUrl = `${this.apiUrl}/isValidSubscriptionAvailable`;
    return this.http.get<any>(serviceUrl);
  }
  getUserProfile()
  {
    var serviceUrl = `${this.apiUrl}/profile`;
    return this.http.get<any>(serviceUrl);
  }
}
