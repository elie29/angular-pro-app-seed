import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ScheduleService } from 'health/shared/services/schedule/schedule.service';
import { Store } from 'store';
import { Subscription } from 'rxjs/Subscription';
import { ScheduleItem } from 'health/shared/services/schedule/schedule.interfaces';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;

  schedule$: Observable<ScheduleItem[]>;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe()
    ];
  }

  changeDate(event: Date): void {
    this.scheduleService.updateDate(event);
  }

  changeSection(event: any): void {
    this.scheduleService.selectSection(event);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
