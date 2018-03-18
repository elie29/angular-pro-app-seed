import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators/tap';
import { Store } from 'store';

@Injectable()
export class ScheduleService {
  date$ = new BehaviorSubject(new Date());

  schedule$ = this.date$.pipe(tap(next => this.store.set('date', next)));

  constructor(private store: Store) {}

  updateDate(date: Date): void {
    this.date$.next(date);
  }
}
