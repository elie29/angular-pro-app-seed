import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'auth-form',
  styleUrls: ['auth-form.component.scss'],
  templateUrl: 'auth-form.component.html'
})
export class AuthFormComponent {
  form: FormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  @Output() submitted = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid(): boolean {
    const control = this.form.get('password');
    return control.invalid && (control.dirty || control.touched);
  }

  get emailInvalid(): boolean {
    const control = this.form.get('email');
    return control.invalid && (control.dirty || control.touched);
  }
}
