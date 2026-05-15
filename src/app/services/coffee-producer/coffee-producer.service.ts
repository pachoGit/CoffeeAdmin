import { inject, Injectable } from '@angular/core';
import { CreateCoffeeProducerRequest } from './request/create-coffee-producer.request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoffeeResponse } from '../coffee-response';
import { ListCoffeeProducerResponse } from './response/list-coffee-producer.response';
import { ListCoffeeProducerRequest } from './request/list-coffee-producer.request';
import { GetCoffeeProducerByIdResponse } from './response/get-coffee-producer-by-id.response';
import { UpdateCoffeeProducerRequest } from './request/update-coffee-producer.request';
import { UpdateCoffeeProducerResponse } from './response/update-coffee-producer.response';

@Injectable({
  providedIn: 'root',
})
export class CoffeeProducerService {
  private http = inject(HttpClient);

  private baseUrl: string = environment.URL_API + '/api/coffee-producer';

  public create(request: CreateCoffeeProducerRequest): Observable<CoffeeResponse<number>> {
    return this.http.post<CoffeeResponse<number>>(this.baseUrl, request);
  }

  public list(
    request?: ListCoffeeProducerRequest,
  ): Observable<CoffeeResponse<ListCoffeeProducerResponse>> {
    let url = this.baseUrl + '/list';
    return this.http.get<CoffeeResponse<ListCoffeeProducerResponse>>(url, {
      params: { ...request },
    });
  }

  public getById(id: number): Observable<CoffeeResponse<GetCoffeeProducerByIdResponse>> {
    let url = this.baseUrl + '/' + id;
    return this.http.get<CoffeeResponse<GetCoffeeProducerByIdResponse>>(url);
  }

  public update(
    request: UpdateCoffeeProducerRequest,
  ): Observable<CoffeeResponse<UpdateCoffeeProducerResponse>> {
    let url = this.baseUrl;
    return this.http.put<CoffeeResponse<UpdateCoffeeProducerResponse>>(url, request);
  }

  public delete(id: number): Observable<CoffeeResponse<boolean>> {
    let url = this.baseUrl + '/' + id;
    return this.http.delete<CoffeeResponse<boolean>>(url);
  }
}
