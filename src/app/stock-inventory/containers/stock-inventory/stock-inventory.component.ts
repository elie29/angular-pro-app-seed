import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Product } from '../../models/product.interface';

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
        (removed)="removeStock($event)">
      </stock-products>

      <hr />
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
  products: Product[] = [
    { id: 1, price: 2800, name: 'MacBook Pro' },
    { id: 2, price: 50, name: 'USB-C Adaptor' },
    { id: 3, price: 400, name: 'iPod' },
    { id: 4, price: 900, name: 'iPhone' },
    { id: 5, price: 600, name: 'Apple Watch' }
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      store: this.fb.group({
        branch: '',
        code: ''
      }),
      selector: this.createStock({}),
      stock: this.fb.array([])
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

  addStock(event: any): void {
    if (event.product_id === '') {
      return;
    }
    const stock = this.createStock(event);
    (this.form.get('stock') as FormArray).push(stock);
  }

  // data is not needed just for explanation purpose
  removeStock({ data, index }: { data: FormGroup; index: number }): void {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  private createStock(stock: any): FormGroup {
    return this.fb.group({
      product_id: +stock.product_id || '',
      quantity: +stock.quantity || 10
    });
  }
}
