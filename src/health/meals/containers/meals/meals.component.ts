import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meal } from 'health/shared/services/meals/meal.interface';
import { MealsService } from 'health/shared/services/meals/meals.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from 'store';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  templateUrl: 'meals.component.html'
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;

  private subscription: Subscription;

  constructor(private mealsService: MealsService, private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select('meals');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRemoveMeal(event: Meal) {
    // returns thenable but no need for async/await
    this.mealsService.removeMeal(event.$key);
  }
}
