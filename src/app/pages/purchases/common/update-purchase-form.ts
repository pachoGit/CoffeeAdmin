import { FormGroup } from '@angular/forms';
import { BasePurchaseFormManager } from './base-purchase-form';
import {
  UpdatePurchaseRequest,
  DetailPurchaseUpdateRequest,
} from '../../../services/purchases/request/update-purchase.request';
import { GetPurchaseByIdResponse } from '../../../services/purchases/response/get-purchase-by-id.response';

export class UpdatePurchaseFormManager extends BasePurchaseFormManager<UpdatePurchaseRequest> {
  transformToRequest(): UpdatePurchaseRequest {
    const value = this.form.getRawValue();
    return {
      purchaseDate: new Date(value.purchaseDate),
      totalCost: value.totalCost ?? 0,
      detailPurchases: value.detailPurchases.map((detail: DetailPurchaseUpdateRequest) => ({
        performance: detail.performance ?? 0,
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
              totalPurchasePrice: detail.purchaseBatch.totalPurchasePrice ?? 0,
              expectedBatchSellingPrice: detail.purchaseBatch.expectedBatchSellingPrice,
            }
          : null,
      })),
    };
  }

  populateForm(data: GetPurchaseByIdResponse): void {
    const date = new Date(data.purchaseDate);
    const dateStr = date.toISOString().split('T')[0];

    this.form.patchValue({
      coffeeProducerId: data.coffeeProducer.id,
      purchaseDate: dateStr,
    });

    const detailArray = this.getDetailPurchasesArray();
    detailArray.clear();

    data.detailPurchases.forEach((detail) => {
      const detailForm = this.createDetailPurchaseForm();
      detailForm.patchValue({
        performance: detail.performance,
        screenSize: detail.screenSize,
        humidity: detail.humidity,
        coffeeVarietyId: detail.coffeeVariety?.id ?? null,
        coffeeTypeId: detail.coffeeType.id,
      });

      if (detail.purchase) {
        const batchForm = detailForm.get('purchaseBatch') as FormGroup;
        batchForm.patchValue({
          measurementUnitCoffeeId: detail.purchase.measurementUnit.id,
          amount: detail.purchase.amount,
          coffeeMarketPrice: detail.purchase.coffeeMarketPrice,
          totalPurchasePrice: detail.purchase.totalPurchasePrice ?? 0,
          expectedBatchSellingPrice: detail.purchase.expectedBatchSellingPrice,
        });
      }

      detailArray.push(detailForm);
    });
  }
}
