import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'health/shared/shared.module';

import { MealComponent } from './containers/meal/meal.component';
import { MealsComponent } from './containers/meals/meals.component';
import { MealFormComponent } from './components/meal-from/meal-form.component';

const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent },
  { path: ':id', component: MealComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [MealsComponent, MealComponent, MealFormComponent]
})
export class MealsModule {}
