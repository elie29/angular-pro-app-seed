import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from './user.interface';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <h3>{{ title }}</h3>
        <label>
          Email address
          <input type="email" name="email" ngModel #email/>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel />
        </label>
        <button type="submit">{{ title }}</button>
      </form>
    </div>
  `
})
export class AuthFormComponent {
  @Input() title = 'login';

  @Output() submitted = new EventEmitter<User>();

  onSubmit(data: User): void {
    this.submitted.emit(data);
  }
}
