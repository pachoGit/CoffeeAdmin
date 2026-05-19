import { Component, inject, OnInit } from '@angular/core';
import { Layout } from './layout/layout/layout';
import { initFlowbite } from 'flowbite';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: 'app.html',
})
export class App implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    // Debido a router outlet, se tiene que re-inicializar flowbite
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          initFlowbite();
        }, 0);
      }
    });
  }
}
