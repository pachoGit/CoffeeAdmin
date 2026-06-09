export interface GetPurchaseByIdResponse {
  id: number;
  purchaseDate: Date;
  totalPrice: number;
  coffeeProducer: CoffeeProducerGetPurchase;
  detailPurchases: DetailPurchaseGetPurchase[];
  createdAt: Date;
  updateAt: Date;
}

export interface CoffeeProducerGetPurchase {
  id: number;
  firstName: string;
  lastName?: string;
}

export interface DetailPurchaseGetPurchase {
  id: number;
  performance: number;
  screenSize: number;
  humidity: number;
  coffeeVariety: CoffeeVarietyGetPurchase | null;
  coffeeType: CoffeeTypeGetPurchase;
  purchase: PurchaseBatchGetPurchase | null;
}

export interface CoffeeVarietyGetPurchase {
  id: number;
  code: string;
  name: string;
}

export interface CoffeeTypeGetPurchase {
  id: number;
  code: string;
  name: string;
}

export interface PurchaseBatchGetPurchase {
  id: number;
  measurementUnit: MeasurementUnitGetPurchase;
  amount: number;
  coffeeMarketPrice: number;
  expectedBatchSellingPrice: number | null;
  totalPurchasePrice: number;
}

export interface MeasurementUnitGetPurchase {
  id: number;
  code: string;
  name: string;
}
