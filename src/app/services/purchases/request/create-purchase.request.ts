export class CreatePurchaseRequest {
  public coffeeProducerId: number = 0;
  public purchaseDate: Date = new Date();
  public totalCost: number = 0;
  public detailPurchases: DetailPurchaseRequest[] = [];
}

export class DetailPurchaseRequest {
  public scoreSCA: number = 0;
  public screenSize: number = 0;
  public humidity: number = 0;
  public coffeeVarietyId: number | null = null;
  public coffeeTypeId: number = 0;
  public purchaseBatch: PurchaseBatchRequest | null = null;
}

export class PurchaseBatchRequest {
  public measurementUnitCoffeeId: number = 0;
  public amount: number = 0;
  public coffeeMarketPrice: number = 0;
  public batchPurchasePrice: number = 0;
  public expectedBatchSellingPrice: number | null = null;
}
