import { HttpInterceptorFn,HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import {  } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import { AuthService } from '../services/auth.service';
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor{
//   constructor(private authService: AuthService) {}
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     debugger;
//     // Clone the request to add the API Key header
//     req = req.clone({
//       setHeaders: {
//         'X-API-KEY': environment.apiKey // Attach API key from environment file
//       }
//     });

//     const token = this.authService.getToken();

//     // If token exists, clone request and add Authorization header
//     if (token) {
//       req = req.clone({
//         setHeaders: { Authorization: `Bearer ${token}` }
//       });
//     }

//     return next.handle(req);
//   }
// }
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Get stored token
  const apiKey = environment.apiKey;
  // Clone the request and add Authorization and API Key headers
  const authReq = req.clone({
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add Authorization if token exists
      'X-API-KEY': apiKey, // Custom API key header
    }
  });

  return next(authReq); // Forward the modified request
};
