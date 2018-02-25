import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: 'meals', loadChildren: './meals/meals.module#MealsModule' },
  {
    path: 'schedule',
    loadChildren: './schedule/schedule.module#ScheduleModule'
  },
  {
    path: 'workouts',
    loadChildren: './workouts/workouts.module#WorkoutsModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)]
})
export class HealthModule {}
