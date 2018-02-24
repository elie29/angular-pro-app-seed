import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form (submitted)="onLogin($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not register?</a>
        <button type="submit" [disabled]="working">Login</button>
        <div class="error" *ngIf="error">{{ error }}</div>
      </auth-form>
    </div>
  `
})
export class LoginComponent {
  error: string;
  working = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin(event: FormGroup) {
    const { email, password } = event.value;
    this.error = null;
    this.working = true;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err.message;
      this.working = false;
    }
  }
}
