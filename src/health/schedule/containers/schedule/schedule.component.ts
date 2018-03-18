import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ScheduleService } from 'health/shared/services/schedule/schedule.service';
import { Store } from 'store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.subscriptions = [this.scheduleService.schedule$.subscribe()];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
