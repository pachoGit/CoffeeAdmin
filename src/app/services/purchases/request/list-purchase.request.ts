import { CoffeeRequestPageable } from '../../coffe-request-pageable';

export class ListPurchaseRequest extends CoffeeRequestPageable {
  public startDate?: Date;
  public endDate?: Date;
  public nameProducer?: string;
  public startPrice?: string;
  public endPrice?: string;
}
