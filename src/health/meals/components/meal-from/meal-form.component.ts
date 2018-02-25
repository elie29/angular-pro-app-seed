import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Meal } from 'health/shared/services/meals/meal.interface';

@Component({
  selector: 'meal-form',
  styleUrls: ['meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'meal-form.component.html'
})
export class MealFormComponent {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    // initialised with an empty field
    ingredients: this.fb.array([''])
  });

  @Output() create = new EventEmitter<Meal>();

  constructor(private fb: FormBuilder) {}

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get required(): boolean {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.control(''));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  createMeal(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
}
