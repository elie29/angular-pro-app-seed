import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { Meal } from 'health/shared/services/meals/meal.interface';
import { Workout } from 'health/shared/services/Workouts/Workout.interface';

@Component({
  selector: 'schedule-assign',
  templateUrl: 'schedule-assign.component.html',
  styleUrls: ['schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit {
  @Input() section: any;
  @Input() list: Meal[] | Workout[];

  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<boolean>();

  private selected: string[] = [];

  ngOnInit(): void {
    this.selected = [...this.section.assigned];
  }

  getRoute(name: string): string[] {
    return ['/health', name, 'new'];
  }

  exists(name: string): boolean {
    return this.selected.indexOf(name) !== -1;
  }

  toggleItem(name: string): void {
    if (this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name);
      return;
    }
    this.selected = [...this.selected, name];
  }

  updateAssign(): void {
    // { meals|workouts: string[] }
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign(): void {
    this.cancel.emit(true);
  }
}
