import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs/Observable/forkJoin';

import { Item, Product } from '../../models/product.interface';
import { StockInventoryService } from '../../services/stock-inventory.service';

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <stock-branch
          [parent]="form">
        </stock-branch>

        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)">
        </stock-selector>

        <stock-products
          [parent]="form"
          [map]="productsMap"
          (removed)="removeStock($event)">
        </stock-products>

        <div class="stock-inventory__buttons">
          <button
            type="submit"
            [disabled]="form.invalid">
            Order stock
          </button>
        </div>

        <pre>{{ form.value | json }}</pre>

      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit {
  products: Product[];
  productsMap: Map<number, Product>;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      store: this.fb.group({
        branch: '',
        code: ''
      }),
      selector: this.createStock(),
      stock: this.fb.array([])
    });

    const cart$ = this.stockService.getCartItems();
    const products$ = this.stockService.getProducts();

    // same as zip but emits the last values. Better for request as promiseAll
    forkJoin(cart$, products$).subscribe(
      ([cart, products]: [Item[], Product[]]) => {
        const productsMap = products.map<[number, Product]>(item => [
          item.id,
          item
        ]);
        this.productsMap = new Map(productsMap);
        this.products = products;
        cart.forEach(item => this.addStock(item));
      }
    );
  }

  createStock(stock: Item = {}): FormGroup {
    return this.fb.group({
      product_id: +stock.product_id || '',
      quantity: stock.quantity || 10
    });
  }

  addStock(stock: Item): void {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ group, index }: { group: FormGroup; index: number }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}