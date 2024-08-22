import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

export function tokenGetter() {
  return localStorage.getItem('nestjs_chat_app') || '';
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), 
    provideAnimationsAsync(),
    importProvidersFrom(
      BrowserAnimationsModule,
      MatSnackBarModule,
      JwtModule.forRoot({
        config:
        {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:3000']
        }
      })
    )
  ]
};
