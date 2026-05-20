import { Component, inject } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PurchaseFormManager } from '../common/purchase-form';
import { PurchaseService } from '../../../services/purchases/purchase-service';

@Component({
  selector: 'coffee-create-purchases',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-purchases.html',
  styleUrl: './create-purchases.css',
})
export class CreatePurchases {
  private purchaseService = inject(PurchaseService);
  private purchaseFormManager = new PurchaseFormManager();
  public purchaseForm = this.purchaseFormManager.getForm();

  get detailPurchases(): FormArray {
    return this.purchaseFormManager.getDetailPurchasesArray();
  }

  protected addDetailPurchase(): void {
    this.purchaseFormManager.addDetailPurchase();
  }

  protected removeDetailPurchase(index: number): void {
    this.purchaseFormManager.removeDetailPurchase(index);
  }

  protected onSubmit(): void {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    const request = this.purchaseFormManager.transformToRequest();
    this.purchaseService.create(request).subscribe({
      next: (response) => {
        console.log('Purchase created successfully', response);
      },
      error: (error) => {
        console.error('Error creating purchase', error);
      },
    });
  }
}
