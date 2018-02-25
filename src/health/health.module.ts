import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'auth/shared/guards/auth.guard';

const ROUTES: Routes = [
  {
    // Useful to activate the guard for all children
    path: 'health',
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'schedule' },
      { path: 'meals', loadChildren: './meals/meals.module#MealsModule' },
      {
        path: 'schedule',
        loadChildren: './schedule/schedule.module#ScheduleModule'
      },
      {
        path: 'workouts',
        loadChildren: './workouts/workouts.module#WorkoutsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)]
})
export class HealthModule {}
