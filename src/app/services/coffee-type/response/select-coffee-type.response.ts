export interface SelectCoffeeTypeResponse {
  result: DataSelectCoffeeTypeResponse[];
}

export interface DataSelectCoffeeTypeResponse {
  id: number;
  name: string;
  code: string;
}
