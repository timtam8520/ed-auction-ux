import { Injectable } from '@angular/core';
import { BASE_URL } from '../base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private bidsURL = productId => BASE_URL + `/products/${productId}/bid`;
  private bidsStatusURL = productId => BASE_URL + `/products/${productId}/bid/status`;

  constructor(private http: HttpClient) {}

  placeBid(productId: number, bidPrice: number) {
    return this.http.post(this.bidsURL(productId), { bidPrice });
  }

  status(productId: number) {
    return this.http.get(this.bidsStatusURL(productId));
  }
}
