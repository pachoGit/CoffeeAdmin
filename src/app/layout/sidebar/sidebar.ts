import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'coffee-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {}
