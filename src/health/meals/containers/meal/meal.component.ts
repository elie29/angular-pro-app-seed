import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'health/shared/services/meals/meal.interface';
import { MealsService } from 'health/shared/services/meals/meals.service';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  templateUrl: 'meal.component.html'
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<any>;
  private subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // subscribe to meals$ in order to use the store.select in getMeal
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap(params => {
        return this.mealsService.getMeal(params.id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    // we use the snapshot, the static call
    const id = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(id, event);
    this.backToMeals();
  }

  async removeMeal() {
    const id = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(id);
    this.backToMeals();
  }

  private backToMeals(): void {
    this.router.navigate(['/health/meals']);
  }
}
