import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((c) => c.HomeComponent),
  },

  {
    path: 'coffee-producers',
    loadChildren: () =>
      import('./pages/coffee-producers/coffee-producers.routes').then((m) => m.routes),
  },

  {
    path: 'purchases',
    loadChildren: () => import('./pages/purchases/purchases.routes').then((m) => m.routes),
  },
];
