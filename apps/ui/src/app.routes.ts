import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path:'',
    loadComponent:()=>import('./pages/layouts/layouts'),
    children:[
      {
        path:'',
        loadComponent:()=>import('./pages/home/home')
      },
       {
        path:'products/:categoryUrl',
        loadComponent:()=>import('./pages/home/home')
      },
       {
        path:'auth',
        loadChildren:()=>import('./pages/auth/routes').then(m=>m.default)
      }
    ]
  }
];
