import { HttpClient } from '@angular/common/http';
import { inject, Injectable, ɵComponentFactory } from '@angular/core';
import { ListPurchaseRequest } from './request/list-purchase.request';
import { Observable, timeoutWith } from 'rxjs';
import { ListPurchaseResponse } from './response/list-purchase.response';
import { GetPurchaseByIdResponse } from './response/get-purchase-by-id.response';
import { environment } from '../../../environments/environment';
import { CoffeeResponse } from '../coffee-response';
import { CreatePurchaseRequest } from './request/create-purchase.request';
import { CreatePurchaseResponse } from './response/create-purchase.response';
import { UpdatePurchaseRequest } from './request/update-purchase.request';
import { UpdatePurchaseResponse } from './response/update-purchase.response';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private http = inject(HttpClient);

  private baseUrl: string = environment.URL_API + '/api/purchase';

  public create(
    request: CreatePurchaseRequest,
  ): Observable<CoffeeResponse<CreatePurchaseResponse>> {
    let url = this.baseUrl;
    return this.http.post<CoffeeResponse<CreatePurchaseResponse>>(url, request);
  }

  public update(
    id: number,
    request: UpdatePurchaseRequest,
  ): Observable<CoffeeResponse<UpdatePurchaseResponse>> {
    let url = this.baseUrl + '/' + id;
    return this.http.put<CoffeeResponse<UpdatePurchaseResponse>>(url, request);
  }

  public getById(id: number): Observable<CoffeeResponse<GetPurchaseByIdResponse>> {
    let url = this.baseUrl + '/' + id;
    return this.http.get<CoffeeResponse<GetPurchaseByIdResponse>>(url);
  }

  public list(request?: ListPurchaseRequest): Observable<CoffeeResponse<ListPurchaseResponse>> {
    let url = this.baseUrl + '/list';
    return this.http.get<CoffeeResponse<ListPurchaseResponse>>(url, {
      params: { ...(request as any) },
    });
  }
}
