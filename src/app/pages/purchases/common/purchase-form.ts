import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import {
  CreatePurchaseRequest,
  DetailPurchaseRequest,
} from '../../../services/purchases/request/create-purchase.request';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import Currency from 'currency.js';

export class PurchaseFormManager {
  private form: FormGroup;
  private destroy$ = new Subject<void>();

  constructor() {
    this.form = this.createPurchaseForm();
    this.setupAutoCalc();
  }

  private setupAutoCalc(): void {
    this.getDetailPurchasesArray()
      .valueChanges.pipe(debounceTime(50), takeUntil(this.destroy$))
      .subscribe(() => this.recalculateTotal());
  }

  private recalculateTotal(): void {
    const details = this.getDetailPurchasesArray();
    let total = 0;
    details.controls.forEach((detail) => {
      const amount = detail.get('purchaseBatch.amount')?.value ?? 0;
      const price = detail.get('purchaseBatch.batchPurchasePrice')?.value ?? 0;
      total += amount * price;
    });
    this.form.get('totalCost')?.setValue(total, { emitEvent: false });
  }

  getForm(): FormGroup {
    return this.form;
  }

  private createPurchaseForm(): FormGroup {
    const today = new Date().toISOString().split('T')[0];
    const form = new FormGroup({
      coffeeProducerId: new FormControl<number | null>(null, Validators.required),
      purchaseDate: new FormControl<string>(today, Validators.required),
      totalCost: new FormControl<number>(0, Validators.required),
      detailPurchases: new FormArray<FormGroup>([]),
    });
    form.get('totalCost')?.disable({ emitEvent: false });
    return form;
  }

  private createDetailPurchaseForm(): FormGroup {
    return new FormGroup({
      scoreSCA: new FormControl<number>(0),
      screenSize: new FormControl<number>(0),
      humidity: new FormControl<number>(0),
      coffeeVarietyId: new FormControl<number | null>(null),
      coffeeTypeId: new FormControl<number | null>(null, Validators.required),
      purchaseBatch: this.createPurchaseBatchForm(),
    });
  }

  private createPurchaseBatchForm(): FormGroup {
    return new FormGroup({
      measurementUnitCoffeeId: new FormControl<number | null>(null, Validators.required),
      amount: new FormControl<number>(0),
      coffeeMarketPrice: new FormControl<number>(0),
      batchPurchasePrice: new FormControl<number>(0),
      expectedBatchSellingPrice: new FormControl<number | null>(null),
    });
  }

  getDetailPurchasesArray(): FormArray {
    return this.form.get('detailPurchases') as FormArray;
  }

  addDetailPurchase(): void {
    const detailPurchases = this.getDetailPurchasesArray();
    detailPurchases.push(this.createDetailPurchaseForm());
  }

  removeDetailPurchase(index: number): void {
    const detailPurchases = this.getDetailPurchasesArray();
    detailPurchases.removeAt(index);
  }

  getDetailPrice(index: number): number {
    const detail = this.getDetailPurchasesArray().at(index) as FormGroup;
    const amount = detail.get('purchaseBatch.amount')?.value ?? 0;
    const price = detail.get('purchaseBatch.batchPurchasePrice')?.value ?? 0;
    return amount * price;
  }

  formatPrice(value: number): string {
    return Currency(value, { symbol: 'S/.' }).format();
  }

  transformToRequest(): CreatePurchaseRequest {
    const value = this.form.getRawValue();
    return {
      coffeeProducerId: value.coffeeProducerId ?? 0,
      purchaseDate: new Date(value.purchaseDate),
      totalCost: value.totalCost ?? 0,
      detailPurchases: value.detailPurchases.map((detail: DetailPurchaseRequest) => ({
        scoreSCA: detail.scoreSCA ?? 0,
        screenSize: detail.screenSize ?? 0,
        humidity: detail.humidity ?? 0,
        coffeeVarietyId: detail.coffeeVarietyId,
        coffeeTypeId: detail.coffeeTypeId ?? 0,
        purchaseBatch: detail.purchaseBatch
          ? {
              measurementUnitCoffeeId: detail.purchaseBatch.measurementUnitCoffeeId ?? 0,
              amount: detail.purchaseBatch.amount ?? 0,
              coffeeMarketPrice: detail.purchaseBatch.coffeeMarketPrice ?? 0,
              batchPurchasePrice: detail.purchaseBatch.batchPurchasePrice ?? 0,
              expectedBatchSellingPrice: detail.purchaseBatch.expectedBatchSellingPrice,
            }
          : null,
      })),
    };
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
