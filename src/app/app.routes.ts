import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { adminGuard } from './guards/admin.guard';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'live', loadComponent: () => import('./pages/live/live.component').then(m => m.LiveComponent), canActivate: [AuthGuard] },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)/*, canActivate: [adminGuard]*/ },
  { path: 'subscribe', loadComponent: () => import('./pages/subscription/subscription.component').then(m => m.SubscriptionComponent), canActivate: [AuthGuard] },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
  { path: 'profile', loadComponent: () => import('./pages/user-profile/user-profile.component').then(m => m.UserProfileComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' } // Redirect unknown routes to login
];
@NgModule({
  //declarations: [AppComponent],
  imports: [RouterModule.forRoot(routes), MatButtonModule, MatToolbarModule, BrowserModule, NgxSpinnerModule, CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
