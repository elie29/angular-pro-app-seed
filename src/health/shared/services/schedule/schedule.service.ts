import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { Subject } from 'rxjs/Subject';

import { AuthService } from 'auth/shared/services';
import {
  ScheduleItem,
  ScheduleList
} from 'health/shared/services/schedule/schedule.interfaces';
import { Store } from 'store';

@Injectable()
export class ScheduleService {
  /**
   * date$ handles the date change in schedule-controls
   */
  private date$ = new BehaviorSubject(new Date());

  /**
   * section$ handles the clicked section in schedule-section
   */
  private section$ = new Subject();

  /**
   * itemList$ handles selected meal or workout names
   */
  private itemList$ = new Subject();

  // based on date$ when it changes, it handles all items for the current date
  schedule$: Observable<ScheduleList> = this.date$.pipe(
    tap(next => this.store.set('date', next)), // update the date in store
    map(date => this.startEndAt(date)),
    switchMap(({ startAt, endAt }) => this.getSchedule(startAt, endAt)),
    map(data => this.mappedData(data)),
    tap(data => this.store.set('schedule', data))
  );

  // based on section$ when it changes, it handle the selected items
  selected$ = this.section$.pipe(tap(next => this.store.set('selected', next)));

  // based on section$ when it changes, it handles the assigned data
  list$ = this.section$.pipe(
    // value: type, assigned, data: current scheduleItem, day, section
    map((value: any) => this.store.value[value.type]), // Meals or Workouts
    tap(next => this.store.set('list', next))
  );

  // based on itemList$ when it changes with the selected section, to save items
  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => this.saveItems(items, section))
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

  /**
   * @param data type, assigned, data: current scheduleItem, day, section
   */
  selectSection(data: any): void {
    this.section$.next(data);
  }

  /**
   * @param items { meals|workouts: string[] }
   */
  updateItems(items: any): void {
    this.itemList$.next(items);
  }

  /**
   * @param items { meals|workouts: string[] }
   * @param section type, assigned, data: current scheduleItem, day, section
   */
  saveItems(items: any, section: any): any {
    const id = section.data.$key;
    if (id) {
      return this.updateSection(id, items, section);
    }
    return this.createSection(items, section);
  }

  private createSection(items: any, section: any) {
    const payload: any = {
      section: section.section, // section key
      timestamp: new Date(section.day).getTime(),
      ...items
    };
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private updateSection(key: string, items: any, section: any) {
    const payload: ScheduleItem = {
      ...section.data,
      ...items // override existing
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

  private mappedData(data: ScheduleItem[]): ScheduleList {
    const mapped: ScheduleList = {};
    for (const prop of data) {
      if (!mapped[prop.section]) {
        mapped[prop.section] = prop;
      }
    }
    return mapped;
  }
}
