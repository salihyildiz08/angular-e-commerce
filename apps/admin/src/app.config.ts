import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';

registerLocaleData(localeTr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideNgxMask(),
    provideHttpClient(),
    {
      provide: 'LOCALE_ID',
      useValue: 'tr',
    },
  ],
};
