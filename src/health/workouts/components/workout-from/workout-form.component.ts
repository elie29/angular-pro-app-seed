import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Workout } from 'health/shared/services/workouts/workout.interface';

@Component({
  selector: 'workout-form',
  styleUrls: ['workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'workout-form.component.html'
})
export class WorkoutFormComponent implements OnChanges {
  toggled = false;
  exists = false;

  @Input() workout: Workout;

  @Output() create = new EventEmitter<Workout>();

  @Output() update = new EventEmitter<Workout>();

  @Output() remove = new EventEmitter<Workout>();

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['strength'],
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.workout && this.workout.$key) {
      this.form.patchValue(this.workout);
      this.exists = true;
    }
  }

  get placeholder(): string {
    return `e.g. ${
      this.form.get('type').value === 'strength' ? 'Benchpress' : 'Treadmill'
    }`;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
