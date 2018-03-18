import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'auth/shared/services';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { Store } from 'store';
import {
  ScheduleList,
  ScheduleItem
} from 'health/shared/services/schedule/schedule.interfaces';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => this.saveItems(items, section))
  );

  selected$ = this.section$.pipe(tap(next => this.store.set('selected', next)));

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap(next => this.store.set('list', next))
  );

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

  updateItems(items: string[]): void {
    this.itemList$.next(items);
  }

  saveItems(items: string[], section: any): any {
    const id = section.data.$key;
    if (id) {
      return this.updateSection(id, items, section);
    }
    return this.createSection(items, section);
  }

  private createSection(items: string[], section: any) {
    const payload: any = {
      workouts: null,
      meals: null,
      section: section.section,
      timestamp: new Date(section.day).getTime(),
      ...items
    };
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private updateSection(key: string, items: string[], section: any) {
    const payload: ScheduleItem = {
      ...section.data,
      ...items
    };
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
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
