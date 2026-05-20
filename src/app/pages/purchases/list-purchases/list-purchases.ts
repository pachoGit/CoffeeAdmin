import { Component, inject, OnInit, signal } from '@angular/core';
import { DataListPurchaseResponse } from '../../../services/purchases/response/list-purchase.response';
import { PurchaseService } from '../../../services/purchases/purchase-service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'coffee-list-purchases',
  imports: [DatePipe, RouterLink],
  templateUrl: './list-purchases.html',
  styleUrl: './list-purchases.css',
})
export class ListPurchases implements OnInit {
  private purchaseService = inject(PurchaseService);

  protected purchases = signal<DataListPurchaseResponse[]>([]);

  ngOnInit(): void {
    this.purchaseService.list().subscribe((response) => {
      this.purchases.set(response.data.result);
      setTimeout(() => initFlowbite(), 0);
    });
  }
}
