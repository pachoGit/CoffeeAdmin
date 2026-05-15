import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list-coffee-producer/list-coffee-producer').then((c) => c.ListCoffeeProducer),
  },
];
