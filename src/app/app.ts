import { Component, OnInit } from '@angular/core';
import { Layout } from './layout/layout/layout';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: 'app.html',
})
export class App implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
