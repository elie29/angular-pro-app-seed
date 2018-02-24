import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthForm } from './containers/auth-form/auth-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthForm],
  exports: [AuthForm] // used in register and login containers
})
export class SharedModule {}
