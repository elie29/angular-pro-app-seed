import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MealsComponent } from './containers/meals/meals.component';
import { SharedModule } from 'health/shared/shared.module';
import { MealComponent } from 'health/meals/containers/meal/meal.component';

const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [MealsComponent, MealComponent]
})
export class MealsModule {}
