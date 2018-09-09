import { Injectable } from '@angular/core';
import { BASE_URL } from '../base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private bidsURL = productId => BASE_URL + `/products/${productId}/bid`;

  constructor(private http: HttpClient) {}

  placeBid(productId: number, bidPrice: number) {
    return this.http.post(this.bidsURL(productId), { bidPrice });
  }
}
