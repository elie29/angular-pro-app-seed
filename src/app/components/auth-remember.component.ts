import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-remember',
  template: `
    <label>
      <input type="checkbox" (change)="onChecked($event.target.checked)" />
      Keep me logged in
    </label>
  `
})
export class AuthRememberComponent {
  @Output() checked = new EventEmitter<boolean>();

  onChecked(value: boolean): void {
    this.checked.emit(value);
  }
}
