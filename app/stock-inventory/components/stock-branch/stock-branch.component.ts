import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'stock-branch',
  styleUrls: ['stock-branch.component.scss'],
  template: `
    <div [formGroup]="parent">
      <div formGroupName="store">
        <input
          type="text"
          placeholder="Branch ID"
          formControlName="branch">
        <div class="error" *ngIf="required('branch')">
          Branch ID is required
        </div>
        <div class="error" *ngIf="invalid">
          Branch ID error: 1 letter followed by 3 numbers
        </div>
        <div class="error" *ngIf="unkown">
        Branch ID does not exist
      </div>
        <input
          type="text"
          placeholder="Manager Code"
          formControlName="code">
        <div class="error" *ngIf="required('code')">
          Manager code is required
        </div>
      </div>
    </div>
  `
})
export class StockBranchComponent {
  @Input() parent: FormGroup;

  required(name: string): boolean {
    const control = this.parent.get(`store.${name}`);
    return (control.touched || control.dirty) && control.hasError('required');
  }

  get invalid(): boolean {
    const control = this.parent.get(`store.branch`);
    return (
      !this.required('branch') &&
      control.hasError('invalidBranch') &&
      control.dirty
    );
  }

  get unkown(): boolean {
    const control = this.parent.get(`store.branch`);
    return !this.invalid && control.hasError('unkownBranch') && control.dirty;
  }
}
