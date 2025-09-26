import { Route } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/layouts/layouts'),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'products/:categoryUrl',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/routes').then((m) => m.default),
      },
      {
        path: 'baskets',
        loadComponent: () => import('./pages/baskets/baskets'),
        canActivate: [authGuard],
      },
      {
        path: 'payment',
        loadComponent: () => import('./pages/payment/payment'),
        canActivate: [authGuard],
      },
    ],
  },
];
