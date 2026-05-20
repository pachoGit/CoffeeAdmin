import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SelectMeasurementUnitCoffeeResponse } from './response/select-measurement-unit-coffee.response';
import { CoffeeResponse } from '../coffee-response';

@Injectable({
  providedIn: 'root',
})
export class MeasurementUnitCoffeeService {
  private http = inject(HttpClient);

  private baseUrl: string = environment.URL_API + '/api/measurement-unit-coffee';

  public select(): Observable<CoffeeResponse<SelectMeasurementUnitCoffeeResponse>> {
    let url = this.baseUrl + '/select';
    return this.http.get<CoffeeResponse<SelectMeasurementUnitCoffeeResponse>>(url);
  }
}