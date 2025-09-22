import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { endpointInterceptor } from '@shared/interceptors/endpoint-interceptor';
import { errorInterceptor } from '@shared/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
provideZonelessChangeDetection(),
 provideHttpClient(withInterceptors([endpointInterceptor,errorInterceptor])),
    provideRouter(appRoutes),
  ],
};
