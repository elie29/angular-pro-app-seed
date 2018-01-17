import { Component } from '@angular/core';

import { User } from '../../components/user.interface';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
<div>
  <auth-form (sumitted)="createUser($event)">
    <h3>Create User</h3>
    <button type="submit">Join Us</button>
  </auth-form>
  <auth-form (sumitted)="loginUser($event)">
    <h3>Login</h3>
    <auth-remember (checked)="rememberMe($event)"></auth-remember>
    <button type="submit">Login</button>
  </auth-form>
</div>
  `
})
export class AppComponent {
  private remember = false;

  constructor() {}

  createUser(event: User): void {
    console.log('createUser ', event);
  }

  loginUser(event: User): void {
    console.log('loginUser ', event, this.remember);
  }

  rememberMe(event: boolean): void {
    this.remember = event;
  }
}
