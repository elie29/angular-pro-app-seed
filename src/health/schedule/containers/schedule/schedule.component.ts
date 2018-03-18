import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Meal } from 'health/shared/services/meals/meal.interface';
import { MealsService } from 'health/shared/services/meals/meals.service';
import { ScheduleItem } from 'health/shared/services/schedule/schedule.interfaces';
import { ScheduleService } from 'health/shared/services/schedule/schedule.service';
import { Workout } from 'health/shared/services/Workouts/Workout.interface';
import { WorkoutsService } from 'health/shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;

  open = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private mealService: MealsService,
    private workoutSevice: WorkoutsService
  ) {}

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      // Retrieve meals and workouts for list$
      this.mealService.meals$.subscribe(),
      this.workoutSevice.workouts$.subscribe()
    ];
  }

  changeDate(event: Date): void {
    this.scheduleService.updateDate(event);
  }

  /**
   * @param event type, assigned, data: current scheduleItem, day, section
   */
  changeSection(event: any): void {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  /**
   * @param event { meals|workouts: string[] }
   */
  assignItem(event: any): void {
    this.scheduleService.updateItems(event);
    this.cancelAssign();
  }

  cancelAssign(): void {
    this.open = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
