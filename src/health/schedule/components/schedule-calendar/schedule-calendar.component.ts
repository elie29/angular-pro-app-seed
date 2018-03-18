import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

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

  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(this.selectedDay);
  }

  @Output() change = new EventEmitter<Date>();

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

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getStartOfWeek(date: Date): Date {
    const start = new Date();
    const day = date.getDay(); // 0 => sunday
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    return start;
  }
}
