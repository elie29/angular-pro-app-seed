import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MealsComponent } from 'health/meals/containers/meals/meals.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [{ path: '', component: MealsComponent }];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(ROUTES)],
  declarations: [MealsComponent]
})
export class MealsModule {}
