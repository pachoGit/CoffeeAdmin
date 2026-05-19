import { FormControl, FormGroup, FormArray } from '@angular/forms';

export interface PurchaseFormData {
  coffeeProducerId: number | null;
  purchaseDate: string;
  totalCost: number;
}

export interface DetailPurchaseFormData {
  scoreSCA: number;
  screenSize: number;
  humidity: number;
  coffeeVarietyId: number | null;
  coffeeTypeId: number;
  purchaseBatch: PurchaseBatchFormData | null;
}

export interface PurchaseBatchFormData {
  measurementUnitCoffeeId: number | null;
  amount: number;
  coffeeMarketPrice: number;
  batchPurchasePrice: number;
  expectedBatchSellingPrice: number | null;
}

export function createPurchaseForm(): FormGroup {
  return new FormGroup({
    coffeeProducerId: new FormControl<number | null>(null),
    purchaseDate: new FormControl<string>(''),
    totalCost: new FormControl<number>(0),
    detailPurchases: new FormArray<FormGroup>([]),
  });
}

export function createDetailPurchaseForm(): FormGroup {
  return new FormGroup({
    scoreSCA: new FormControl<number>(0),
    screenSize: new FormControl<number>(0),
    humidity: new FormControl<number>(0),
    coffeeVarietyId: new FormControl<number | null>(null),
    coffeeTypeId: new FormControl<number>(0),
    purchaseBatch: createPurchaseBatchForm(),
  });
}

export function createPurchaseBatchForm(): FormGroup {
  return new FormGroup({
    measurementUnitCoffeeId: new FormControl<number | null>(null),
    amount: new FormControl<number>(0),
    coffeeMarketPrice: new FormControl<number>(0),
    batchPurchasePrice: new FormControl<number>(0),
    expectedBatchSellingPrice: new FormControl<number | null>(null),
  });
}

export function getDetailPurchasesArray(form: FormGroup): FormArray {
  return form.get('detailPurchases') as FormArray;
}

export function addDetailPurchase(form: FormGroup): void {
  const detailPurchases = getDetailPurchasesArray(form);
  detailPurchases.push(createDetailPurchaseForm());
}

export function removeDetailPurchase(form: FormGroup, index: number): void {
  const detailPurchases = getDetailPurchasesArray(form);
  detailPurchases.removeAt(index);
}

export function transformToRequest(form: FormGroup) {
  const value = form.value;
  return {
    coffeeProducerId: value.coffeeProducerId ?? 0,
    purchaseDate: new Date(value.purchaseDate),
    totalCost: value.totalCost ?? 0,
    detailPurchases: value.detailPurchases.map((detail: DetailPurchaseFormData) => ({
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
