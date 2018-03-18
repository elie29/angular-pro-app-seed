import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'auth/shared/services';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';
import { Store } from 'store';
import { ScheduleList } from 'health/shared/services/schedule/schedule.interfaces';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ScheduleService {
  date$ = new BehaviorSubject(new Date());

  section$ = new Subject();

  selected$ = this.section$.pipe(tap(next => this.store.set('selected', next)));

  schedule$: Observable<ScheduleList> = this.date$.pipe(
    tap(next => this.store.set('date', next)),
    map(date => this.startEndAt(date)),
    switchMap(({ startAt, endAt }) => this.getSchedule(startAt, endAt)),
    map(data => this.mappedData(data)),
    tap(data => this.store.set('schedule', data))
  );

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    // User is authenticated
    return this.authService.user.uid;
  }

  updateDate(date: Date): void {
    this.date$.next(date);
  }

  selectSection(data: any): void {
    this.section$.next(data);
  }

  /**
   * @param date current date
   *
   * @returns time of the full day from dmy00:00:00 to dmy23.59.59
   */
  private startEndAt(date: Date): { startAt: number; endAt: number } {
    const startAt = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const endAt = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    return { startAt: startAt.getTime(), endAt: endAt.getTime() - 1 };
  }

  private getSchedule(startAt: number, endAt: number): Observable<any> {
    return this.db.list(`schedule/${this.uid}`, {
      query: {
        orderByChild: 'timestamp',
        startAt,
        endAt
      }
    });
  }

  private mappedData(data: any): ScheduleList {
    const mapped: ScheduleList = {};

    for (const prop of data) {
      if (!mapped[prop.section]) {
        mapped[prop.section] = prop;
      }
    }
    return mapped;
  }
}
