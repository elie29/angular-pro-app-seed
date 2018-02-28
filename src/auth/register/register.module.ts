import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'auth/shared/shared.module';
import { RegisterComponent } from './containers/register/register.component';

const ROUTES: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule // for exported component and shared services
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
