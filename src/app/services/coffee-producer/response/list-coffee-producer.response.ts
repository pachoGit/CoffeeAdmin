import { CoffeeResponsePageable } from '../../coffee-response-pageable';

export interface ListCoffeeProducerResponse extends CoffeeResponsePageable {
  result: DataListCoffeeProducerResponse[];
}

export interface DataListCoffeeProducerResponse {
  id: number;
  firstName: string;
  lastName?: string;
  documentNumber?: string;
  createdAt: Date;
}
