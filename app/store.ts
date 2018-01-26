import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { pluck } from 'rxjs/operators/pluck';

import { State } from './state';

const state: State = {
  playlist: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  // asObservable is to make the store only Observable and hide the fact that is a subject
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state
    });
  }
}
