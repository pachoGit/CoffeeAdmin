import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PurchaseService } from '../../../services/purchases/purchase-service';
import { GetPurchaseByIdResponse } from '../../../services/purchases/response/get-purchase-by-id.response';
import { DatePipe } from '@angular/common';
import Currency from 'currency.js';

@Component({
  selector: 'coffee-view-purchases',
  imports: [DatePipe, RouterLink],
  templateUrl: './view-purchases.html',
  styleUrl: './view-purchases.css',
})
export class ViewPurchases implements OnInit {
  private purchaseService = inject(PurchaseService);
  private route = inject(ActivatedRoute);

  protected purchase = signal<GetPurchaseByIdResponse | null>(null);
  protected loading = signal(true);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.purchaseService.getById(id).subscribe({
      next: (response) => {
        this.purchase.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  formatPrice(value: number): string {
    return Currency(value, { symbol: 'S/.' }).format();
  }

  formatNullablePrice(value: number | null | undefined): string {
    if (value == null) {
      return '-';
    }
    return this.formatPrice(value);
  }
}
