import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule], // has a component that needs these
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent] // used in register and login containers
})
export class SharedModule {
  /**
   * this method will be called in auth.module.ts
   * so all instances in providers will be created once
   * and shared among all modules including SharedModule and AuthModule
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AuthGuard]
    };
  }
}
