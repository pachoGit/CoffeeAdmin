import { FormControl, FormGroup, FormArray } from '@angular/forms';
import {
  CreatePurchaseRequest,
  DetailPurchaseRequest,
} from '../../../services/purchases/request/create-purchase.request';

export class PurchaseFormManager {
  private form: FormGroup;

  constructor() {
    this.form = this.createPurchaseForm();
  }

  getForm(): FormGroup {
    return this.form;
  }

  private createPurchaseForm(): FormGroup {
    return new FormGroup({
      coffeeProducerId: new FormControl<number | null>(null),
      purchaseDate: new FormControl<string>(''),
      totalCost: new FormControl<number>(0),
      detailPurchases: new FormArray<FormGroup>([]),
    });
  }

  private createDetailPurchaseForm(): FormGroup {
    return new FormGroup({
      scoreSCA: new FormControl<number>(0),
      screenSize: new FormControl<number>(0),
      humidity: new FormControl<number>(0),
      coffeeVarietyId: new FormControl<number | null>(null),
      coffeeTypeId: new FormControl<number>(0),
      purchaseBatch: this.createPurchaseBatchForm(),
    });
  }

  private createPurchaseBatchForm(): FormGroup {
    return new FormGroup({
      measurementUnitCoffeeId: new FormControl<number | null>(null),
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

  transformToRequest(): CreatePurchaseRequest {
    const value = this.form.value;
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
}
