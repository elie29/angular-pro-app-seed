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
    <button type="submit">Login</button>
  </auth-form>
</div>
  `
})
export class AppComponent {
  constructor() {}

  createUser(event: User): void {
    console.log(event);
  }

  loginUser(event: User): void {
    console.log(event);
  }
}
