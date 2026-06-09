import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CoffeeResponse } from '../coffee-response';
import { OverviewRequest } from './request/overview.request';
import { OverviewResponse } from './response/overview.response';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private http = inject(HttpClient);
  private baseUrl = environment.URL_API + '/api/overview';

  public getPurchaseOverview(
    request: OverviewRequest,
  ): Observable<CoffeeResponse<OverviewResponse>> {
    let params = new HttpParams();
    if (request.startDate) {
      params = params.set('startDate', request.startDate.toISOString());
    }
    if (request.endDate) {
      params = params.set('endDate', request.endDate.toISOString());
    }

    return this.http.get<CoffeeResponse<OverviewResponse>>(`${this.baseUrl}/purchase`, {
      params,
    });
  }
}
