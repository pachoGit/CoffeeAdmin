import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { NotificationComponent } from '../../shared/components/notification/notification';

@Component({
  selector: 'coffee-layout',
  imports: [RouterOutlet, Header, Sidebar, NotificationComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
