// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter, withHashLocation,Routes } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { importProvidersFrom } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { LiveComponent } from './app/pages/live/live.component';
// import { LoginComponent } from './app/pages/login/login.component';
// const routes: Routes  = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
//   { path: 'login', component: LoginComponent },
//   { path: 'live', component: LiveComponent },
//   { path: '**', redirectTo: 'login' } // Handle unknown routes
// ];
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes, withHashLocation()),  // Define your routes here
//     provideHttpClient(),
//     provideAnimations(),
//     importProvidersFrom(FormsModule)
//   ]
// }).catch(err => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent,
   appConfig)
  .catch((err) => console.error(err));
