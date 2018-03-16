import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { StockInventoryService } from '../../services/stock-inventory.service';

export class StockValidators {
  static checkBranch(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-z]\d{3}$/i;
    return regex.test(control.value) ? null : { invalidBranch: true };
  }

  // Called on a group
  static checkStockExists(group: AbstractControl): ValidationErrors | null {
    const selector = group.get('selector'); // la liste déroulante
    const stock = group.get('stock');

    if (!(selector && stock)) return null;

    const exists = stock.value.some(
      item => item.product_id === +selector.value.product_id
    );
    return exists ? { stockExists: true } : null;
  }

  static validateBranch(stockService: StockInventoryService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return stockService
        .checkBranchId(control.value)
        .pipe(map(res => (res ? null : { unkownBranch: true })));
    };
  }
}
