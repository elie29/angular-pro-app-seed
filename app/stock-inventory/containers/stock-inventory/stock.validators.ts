import { AbstractControl, ValidationErrors } from '@angular/forms';

export class StockValidators {
  static checkBranch(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-z]\d{3}$/i;
    return regex.test(control.value) ? null : { invalidBranch: true };
  }
}
