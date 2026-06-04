import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button';

@Component({
  selector: 'coffee-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  private router = inject(Router);

  goToPurchases(): void {
    this.router.navigate(['/purchases']);
  }

  goToProducers(): void {
    this.router.navigate(['/coffee-producers']);
  }
}
