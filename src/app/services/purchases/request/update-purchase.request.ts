export class UpdatePurchaseRequest {
  public purchaseDate: Date = new Date();
  public totalCost: number = 0;
  public detailPurchases: DetailPurchaseUpdateRequest[] = [];
}

export class DetailPurchaseUpdateRequest {
  public performance: number = 0;
  public screenSize: number = 0;
  public humidity: number = 0;
  public coffeeVarietyId: number | null = null;
  public coffeeTypeId: number = 0;
  public purchaseBatch: PurchaseBatchUpdateRequest | null = null;
}

export class PurchaseBatchUpdateRequest {
  public measurementUnitCoffeeId: number = 0;
  public amount: number = 0;
  public coffeeMarketPrice: number = 0;
  public batchPurchasePrice: number = 0;
  public totalPurchasePrice: number = 0;
  public expectedBatchSellingPrice: number | null = null;
}
