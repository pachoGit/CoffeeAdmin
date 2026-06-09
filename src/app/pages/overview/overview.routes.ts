import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./overview').then((c) => c.OverviewComponent),
  },
];
