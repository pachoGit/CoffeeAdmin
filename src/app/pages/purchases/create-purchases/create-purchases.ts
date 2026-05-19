import { Component, inject } from '@angular/core';
import { FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  createPurchaseForm,
  createDetailPurchaseForm,
  addDetailPurchase,
  removeDetailPurchase,
  transformToRequest,
} from '../common/purchase-form';
import { PurchaseService } from '../../../services/purchases/purchase-service';

@Component({
  selector: 'coffee-create-purchases',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-purchases.html',
  styleUrl: './create-purchases.css',
})
export class CreatePurchases {
  private purchaseService = inject(PurchaseService);
  public purchaseForm: FormGroup = createPurchaseForm();

  get detailPurchases(): FormArray {
    return this.purchaseForm.get('detailPurchases') as FormArray;
  }

  addDetailPurchase(): void {
    addDetailPurchase(this.purchaseForm);
  }

  removeDetailPurchase(index: number): void {
    removeDetailPurchase(this.purchaseForm, index);
  }

  onSubmit(): void {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    const request = transformToRequest(this.purchaseForm);
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