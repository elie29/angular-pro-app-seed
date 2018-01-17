import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList
} from '@angular/core';

import { AuthRememberComponent } from './auth-remember.component';
import { User } from './user.interface';

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
    <ng-content select="auth-remember"></ng-content>
    <div *ngIf="showMessage">
      You will be logged in for 30 days.
    </div>
    <ng-content select="button"></ng-content>
  </form>
</div>
  `
})
export class AuthFormComponent implements AfterContentInit {
  @Output() sumitted = new EventEmitter<User>();

  @ContentChildren(AuthRememberComponent)
  private remember: QueryList<AuthRememberComponent>;

  showMessage = false;

  ngAfterContentInit(): void {
    if (this.remember) {
      this.remember.forEach(item =>
        item.checked.subscribe((event: boolean) => (this.showMessage = event))
      );
    }
  }

  onSubmit(data: User): void {
    this.sumitted.emit(data);
  }
}
