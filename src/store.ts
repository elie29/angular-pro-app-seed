import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { pluck } from 'rxjs/operators/pluck';

import { Meal } from 'health/shared/services/meals/meal.interface';
import { User } from 'auth/shared/services';

export interface State {
  user: User;
  meals: Meal[];
}

const state: State = {
  user: null,
  meals: null
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
