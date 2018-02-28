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
import { Meal } from 'health/shared/services/meals/meal.interface';

@Component({
  selector: 'meal-form',
  styleUrls: ['meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'meal-form.component.html'
})
export class MealFormComponent implements OnChanges {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    // initialised with an empty field
    ingredients: this.fb.array([''])
  });

  @Input() meal: Meal;
  @Output() create = new EventEmitter<Meal>();
  @Output() update = new EventEmitter<Meal>();
  @Output() remove = new EventEmitter<Meal>();

  exists = false;
  toggled = false;

  constructor(private fb: FormBuilder) {}

  // This function will get called if we chaneg our firebase
  ngOnChanges(changes: SimpleChanges): void {
    // meal is passed here after initialisation !!
    if (this.meal && this.meal.$key) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.addIngredient(item);
        }
      }
    }
  }

  private emptyIngredients(): void {
    while (this.ingredients.length) {
      this.ingredients.removeAt(0);
    }
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get required(): boolean {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  addIngredient(item = ''): void {
    this.ingredients.push(this.fb.control(item));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  createMeal(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal(): void {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal(): void {
    if (this.exists) {
      this.remove.emit();
    }
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }
}
