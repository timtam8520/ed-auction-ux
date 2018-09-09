import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../base.service';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsURL = BASE_URL + '/products';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsURL}/${productId}`);
  }

}
