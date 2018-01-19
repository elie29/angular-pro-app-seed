import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Product } from '../../models/product.interface';

@Component({
  selector: 'stock-selector',
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
      <input type="number" step="10" formControlName="quantity" />
      <button type="button" (click)="onAdd()">Add stock</button>
    </div>
  </div>
  `
})
export class StockSelectorComponent {
  @Input() parent: FormGroup;
  @Input() products: Product[];
  @Output() added = new EventEmitter<any>();

  onAdd(): void {
    this.added.emit(this.parent.get('selector').value);
  }
}
