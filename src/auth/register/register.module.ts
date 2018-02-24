import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './containers/register/register.component';

const ROUTES: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: [RegisterComponent]
})
export class RegisterModule {}
