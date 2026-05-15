import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'coffee-producers',
    pathMatch: 'full',
  },

  {
    path: 'coffee-producers',
    loadChildren: () =>
      import('./pages/coffee-producers/coffee-producers.routes').then((m) => m.routes),
  },
];
