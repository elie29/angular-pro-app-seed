import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ListItemComponent } from './components/list-item/list-item.component';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';
import { MealsService } from './services/meals/meals.service';
import { ScheduleService } from './services/schedule/schedule.service';
import { WorkoutsService } from './services/workouts/workouts.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    // Needed in the shared component
    RouterModule
  ],
  declarations: [ListItemComponent, JoinPipe, WorkoutPipe],
  exports: [ListItemComponent, JoinPipe, WorkoutPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      // All these services would be injected once in health.module
      // forRoot will be called once and sharedModule will be included in many other modules
      providers: [MealsService, WorkoutsService, ScheduleService]
    };
  }
}
