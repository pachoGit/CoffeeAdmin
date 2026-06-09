import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OverviewService } from '../../services/overview/overview-service';
import { OverviewRequest } from '../../services/overview/request/overview.request';
import { OverviewResponse } from '../../services/overview/response/overview.response';
import { ButtonComponent } from '../../shared/components/button';
import { AppInputDirective, AppLabelDirective } from '../../shared/directives';

@Component({
  selector: 'coffee-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePipe,
    ButtonComponent,
    AppInputDirective,
    AppLabelDirective,
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class OverviewComponent implements OnInit {
  private overviewService = inject(OverviewService);

  protected overview = signal<OverviewResponse | null>(null);
  protected loading = signal(false);
  protected error = signal<string | null>(null);

  protected filterForm = new FormGroup({
    startDate: new FormControl<string | null>(null),
    endDate: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    this.loadOverview();
  }

  protected applyFilter(): void {
    this.loadOverview();
  }

  protected clearFilter(): void {
    this.filterForm.reset();
    this.loadOverview();
  }

  private loadOverview(): void {
    this.loading.set(true);
    this.error.set(null);

    const { startDate, endDate } = this.filterForm.value;
    const request: OverviewRequest = {
      startDate: startDate ? this.parseLocalDate(startDate, false) : null,
      endDate: endDate ? this.parseLocalDate(endDate, true) : null,
    };

    this.overviewService.getPurchaseOverview(request).subscribe({
      next: (response) => {
        this.overview.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar el resumen. Intente nuevamente.');
        this.loading.set(false);
      },
    });
  }

  private parseLocalDate(value: string, endOfDay: boolean): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day, endOfDay ? 23 : 0, endOfDay ? 59 : 0, endOfDay ? 59 : 0);
  }

  protected formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(value);
  }

  protected formatNumber(value: number, decimals: number = 2): string {
    return new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  protected formatInteger(value: number): string {
    return new Intl.NumberFormat('es-PE').format(value);
  }
}
