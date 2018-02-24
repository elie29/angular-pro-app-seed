import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form (submitted)="onLogin($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not register?</a>
        <button type="submit">Login</button>
      </auth-form>
    </div>
  `
})
export class LoginComponent {
  onLogin(event: FormGroup): void {
    console.log(event.value);
  }
}
