import { CoffeeResponsePageable } from '../../coffee-response-pageable';

export interface ListPurchaseResponse extends CoffeeResponsePageable {
  result: DataListPurchaseResponse[];
}

export interface DataListPurchaseResponse {
  id: number;
  purchaseDate: Date;
  totalPrice: number;
  nameProducer: string;
  createdAt: Date;
  updatedAt: Date;
}
