import { BasePurchaseFormManager } from './base-purchase-form';
import {
  CreatePurchaseRequest,
  DetailPurchaseRequest,
} from '../../../services/purchases/request/create-purchase.request';

export class CreatePurchaseFormManager extends BasePurchaseFormManager<CreatePurchaseRequest> {
  transformToRequest(): CreatePurchaseRequest {
    const value = this.form.getRawValue();
    return {
      coffeeProducerId: value.coffeeProducerId ?? 0,
      purchaseDate: new Date(value.purchaseDate),
      totalCost: value.totalCost ?? 0,
      detailPurchases: value.detailPurchases.map((detail: DetailPurchaseRequest) => ({
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
}
