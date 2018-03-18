import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ScheduleItem,
  ScheduleList
} from 'health/shared/services/schedule/schedule.interfaces';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  templateUrl: 'schedule-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleCalendarComponent {
  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' }
  ];

  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date);
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(this.selectedDay);
  }

  @Input() items: ScheduleList;

  @Output() change = new EventEmitter<Date>();

  @Output() select = new EventEmitter<any>();

  selectDay(index: number): void {
    const date = new Date(this.selectedWeek);
    date.setDate(date.getDate() + index);
    this.change.emit(date);
  }

  onChange(weekOffset: number): void {
    const startOfWeek = this.getStartOfWeek(new Date());
    startOfWeek.setDate(startOfWeek.getDate() + weekOffset * 7);
    this.change.emit(startOfWeek);
  }

  getSection(name: string): ScheduleItem {
    return (this.items && this.items[name]) || {};
  }

  selectSection(event: any, section: string): void {
    const day = this.selectedDay;
    this.select.emit({
      ...event, // type, assigned and data
      day,
      section
    });
  }

  /**
   * @param date current date
   *
   * @returns 0 => monday, 6 => sunday
   */
  private getToday(date: Date): number {
    const today = date.getDay();
    if (today === 0) {
      return 6;
    }
    return today - 1;
  }

  private getStartOfWeek(date: Date): Date {
    const start = new Date(date); // clone the date
    const day = this.getToday(start);
    start.setDate(start.getDate() - day);
    return start;
  }
}
