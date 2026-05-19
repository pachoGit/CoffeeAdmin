import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list-purchases/list-purchases').then((c) => c.ListPurchases),
  },

  {
    path: 'create',
    loadComponent: () =>
      import('./create-purchases/create-purchases').then((c) => c.CreatePurchases),
  },
];
