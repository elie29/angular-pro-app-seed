import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ViewChild,
  ElementRef,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';

import { AuthMessageComponent } from './auth-message.component';
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
      <input type="email" name="email" ngModel #email/>
    </label>
    <label>
      Password
      <input type="password" name="password" ngModel />
    </label>
    <ng-content select="auth-remember"></ng-content>
    <auth-message [style.display]="showMessage? 'inherit': 'none'"></auth-message>
    <auth-message [style.display]="showMessage? 'inherit': 'none'"></auth-message>
    <auth-message [style.display]="showMessage? 'inherit': 'none'"></auth-message>
    <ng-content select="button"></ng-content>
  </form>
</div>
  `
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {
  @Output() sumitted = new EventEmitter<User>();

  @ViewChild('email') mail: ElementRef;

  @ViewChildren(AuthMessageComponent)
  private message: QueryList<AuthMessageComponent>;

  @ContentChildren(AuthRememberComponent)
  private remember: QueryList<AuthRememberComponent>;

  showMessage = false;

  ngAfterViewInit(): void {
    // With setTimeout no more errors are generated
    setTimeout(() => this.message.forEach(item => (item.days = 30)));
    console.log(this.mail);
  }

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
