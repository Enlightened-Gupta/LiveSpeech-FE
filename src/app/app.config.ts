import { ApplicationConfig, provideZoneChangeDetection,importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation,Routes,RouterModule ,withComponentInputBinding  } from '@angular/router';
import { provideHttpClient,HTTP_INTERCEPTORS ,withInterceptors  } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule  } from 'ngx-spinner';
import { provideNgxStripe } from 'ngx-stripe';
import { environment } from '../environments/environment';
// Available options
interface NgxSpinnerConfig {
  type?: string;
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withHashLocation(),withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    provideNgxStripe(environment.stripePublishKey),
    importProvidersFrom(FormsModule,RouterModule,MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatToolbarModule,NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthGuard
  ]
};

// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter, withHashLocation,Routes,RouterModule  } from '@angular/router';
// import { importProvidersFrom } from '@angular/core';
// import { provideHttpClient,HTTP_INTERCEPTORS ,withInterceptors  } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { FormsModule } from '@angular/forms';
// import { routes } from './app.routes';
// import { authInterceptor } from './interceptors/auth.interceptor';
// import { AuthGuard } from './guards/auth.guard';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
//     provideRouter(routes, withHashLocation()),
//     provideHttpClient(),
//     provideAnimations(),
//     importProvidersFrom(FormsModule,RouterModule),
//     provideHttpClient(withInterceptors([authInterceptor])),
//     //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
//     AuthGuard
//   ]
// };
