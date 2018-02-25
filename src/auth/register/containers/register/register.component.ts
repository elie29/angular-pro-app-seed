import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'auth/shared/services';

@Component({
  selector: 'register',
  template: `
    <div>
      <auth-form (submitted)="OnRegister($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account?</a>
        <button type="submit" [disabled]="working">Create an account</button>
        <div class="error" *ngIf="error">{{ error }}</div>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {
  error: string;
  working: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  async OnRegister(event: FormGroup) {
    const { email, password } = event.value;
    this.error = null;
    this.working = true;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err.message;
      this.working = false;
    }
  }
}
