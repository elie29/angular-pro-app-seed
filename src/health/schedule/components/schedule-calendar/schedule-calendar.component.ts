import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  templateUrl: 'schedule-calendar.component.html'
})
export class ScheduleCalendarComponent implements OnInit {
  @Input() date: Date;
  constructor() {}

  ngOnInit() {}
}
