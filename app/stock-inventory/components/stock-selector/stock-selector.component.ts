import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Item, Product } from '../../models/product.interface';

@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
    <div class="stock-selector" [formGroup]="parent">
      <div formGroupName="selector">
        <select formControlName="product_id">
          <option value="">Select stock</option>
          <option
            *ngFor="let product of products"
            [value]="product.id">
            {{ product.name }}
          </option>
        </select>
        <input
          type="number"
          step="10"
          min="10"
          max="1000"
          formControlName="quantity">
        <button
          type="button"
          (click)="onAdd()">
          Add stock
        </button>
      </div>
    </div>
  `
})
export class StockSelectorComponent {
  @Input() parent: FormGroup;

  @Input() products: Product[];

  @Output() added = new EventEmitter<Item>();

  onAdd() {
    const control = this.parent.get('selector') as FormGroup;
    if (control.value.product_id) {
      this.added.emit(control.value);
      control.reset({
        product_id: '',
        quantity: 10
      });
    } else {
      alert('Please choose a stock');
    }
  }
}
