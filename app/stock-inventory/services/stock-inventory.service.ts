import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/Observable/throw';
import { catchError } from 'rxjs/operators/catchError';

import { Item, Product } from '../models/product.interface';

@Injectable()
export class StockInventoryService {
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>('/api/cart')
      .pipe(catchError(error => _throw(error)));
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>('/api/products')
      .pipe(catchError(error => _throw(error)));
  }
}
