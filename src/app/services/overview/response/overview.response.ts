export interface OverviewResponse {
  startDate: Date;
  endDate: Date;
  totalProducers: number;
  totalPurchases: number;
  totalBatches: number;
  totalPurchaseBatches: number;
  totalAmount: number;
  totalKilograms: number;
  totalQuintales: number;
  averagePerformance: number;
  averageHumidity: number;
  averageScreenSize: number;
  distinctCoffeeVarieties: number;
  distinctCoffeeTypes: number;
}
