import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CoffeeResponse } from '../coffee-response';
import { SelectCoffeeVarietyResponse } from './response/select-coffee-variety.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoffeeVarietyService {
  private http = inject(HttpClient);

  private baseUrl: string = environment.URL_API + '/api/coffee-variety';

  public select(): Observable<CoffeeResponse<SelectCoffeeVarietyResponse>> {
    let url = this.baseUrl + '/select';
    return this.http.get<CoffeeResponse<SelectCoffeeVarietyResponse>>(url);
  }
}
