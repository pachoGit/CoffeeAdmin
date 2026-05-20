import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SelectCoffeeTypeResponse } from './response/select-coffee-type.response';
import { CoffeeResponse } from '../coffee-response';

@Injectable({
  providedIn: 'root',
})
export class CoffeeTypeService {
  private http = inject(HttpClient);

  private baseUrl: string = environment.URL_API + '/api/coffee-type';

  public select(): Observable<CoffeeResponse<SelectCoffeeTypeResponse>> {
    let url = this.baseUrl + '/select';
    return this.http.get<CoffeeResponse<SelectCoffeeTypeResponse>>(url);
  }
}
