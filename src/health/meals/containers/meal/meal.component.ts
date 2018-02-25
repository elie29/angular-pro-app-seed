import { Component } from '@angular/core';
import { Meal } from 'health/shared/services/meals/meal.interface';
import { MealsService } from 'health/shared/services/meals/meals.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  templateUrl: 'meal.component.html'
})
export class MealComponent {
  meal$: Observable<Meal>;

  constructor(private mealsService: MealsService, private router: Router) {}

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  private backToMeals(): void {
    this.router.navigate(['/health/meals']);
  }
}
