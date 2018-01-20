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
        <stock-counter
          [step]="10"
          [min]="10"
          [max]="80"
          formControlName="quantity">
        </stock-counter>
        <button
          type="button"
          [disabled]="required || stockExists"
          (click)="onAdd()">
          Add stock
        </button>
        <div class="stock-selector__error" *ngIf="stockExists">
          Product exists in the stock
        </div>
      </div>
    </div>
  `
})
export class StockSelectorComponent {
  @Input() parent: FormGroup;

  @Input() products: Product[];

  @Output() added = new EventEmitter<Item>();

  get stockExists(): boolean {
    return (
      this.parent.get('selector.product_id').dirty &&
      this.parent.hasError('stockExists')
    );
  }

  get required(): boolean {
    return this.parent.get('selector.product_id').value === '';
  }

  onAdd() {
    const control = this.parent.get('selector') as FormGroup;
    this.added.emit(control.value);
    control.reset({
      product_id: '',
      quantity: 10
    });
  }
}
