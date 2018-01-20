import { AbstractControl, ValidationErrors } from '@angular/forms';

export class StockValidators {
  static checkBranch(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-z]\d{3}$/i;
    return regex.test(control.value) ? null : { invalidBranch: true };
  }

  static checkStockExists(group: AbstractControl): ValidationErrors | null {
    const selector = group.get('selector'); // la liste déroulante
    const stock = group.get('stock');

    if (!(selector && stock)) return null;

    const exists = stock.value.some(
      item => item.product_id === +selector.value.product_id
    );
    return exists ? { stockExists: true } : null;
  }
}
