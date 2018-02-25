import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'auth/shared/shared.module';
import { LoginComponent } from './containers/login/login.component';

const ROUTES: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule // for component export ans shared services
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
