import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * Головна конфігурація Angular-додатку.
 * Firebase ініціалізується через native SDK у firebase.init.ts,
 * тому @angular/fire провайдери не потрібні.
 * - provideRouter — маршрутизація додатку
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
