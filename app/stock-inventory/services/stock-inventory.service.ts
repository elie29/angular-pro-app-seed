import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';

import { Item, Product } from '../models/product.interface';

@Injectable()
export class StockInventoryService {
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/cart');
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  checkBranchId(id: string): Observable<boolean> {
    const params = new HttpParams({ fromObject: { id } });
    return this.http
      .get('api/branch', { params })
      .pipe(
        map((response: any[]) => !!response.length),
        catchError(_ => of(false))
      );
  }
}
