import { Component, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/components/user.interface';

@Component({
  selector: 'auth-form',
  template: `
<div>
  <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
    <!-- Will contain any content between auth-form tag -->
    <ng-content select="h3"></ng-content>
    <label>
      Email address
      <input type="email" name="email" ngModel />
    </label>
    <label>
      Password
      <input type="password" name="password" ngModel />
    </label>
    <ng-content select="button"></ng-content>
  </form>
</div>
  `
})
export class AuthFormComponent {
  @Output() sumitted = new EventEmitter<User>();

  onSubmit(data: User): void {
    this.sumitted.emit(data);
  }
}
