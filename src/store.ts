import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { pluck } from 'rxjs/operators/pluck';

import { User } from 'auth/shared/services';
import { Meal } from 'health/shared/services/meals/meal.interface';
import { Workout } from 'health/shared/services/Workouts/Workout.interface';
import { ScheduleItem } from 'health/shared/services/schedule/schedule.interfaces';

export interface State {
  user: User;
  meals: Meal[];
  workouts: Workout[];
  schedule: ScheduleItem[];
  selected: any;
  list: any;
  date: Date;
  [key: string]: any; // for selection purpose
}

const state: State = {
  user: null,
  meals: null,
  workouts: null,
  schedule: null,
  selected: null,
  list: null,
  date: null
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  // we can use pipe directly, but with asObservable we limit the use of store
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value(): State {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, value: any): void {
    this.subject.next({ ...this.value, [name]: value });
  }

  get(name: string): any {
    return this.value[name];
  }
}
