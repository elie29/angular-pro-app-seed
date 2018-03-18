import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { ScheduleItem } from 'health/shared/services/schedule/schedule.interfaces';

@Component({
  selector: 'schedule-section',
  templateUrl: 'schedule-section.component.html',
  styleUrls: ['schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSection {
  @Input() name: string;

  @Input() section: ScheduleItem;

  @Output() select = new EventEmitter<any>();

  onSelect(type: string, assigned: string[] = []): void {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    });
  }
}
