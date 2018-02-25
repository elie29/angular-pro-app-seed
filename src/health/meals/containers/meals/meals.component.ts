import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { share } from 'rxjs/operators/share';

import { Meal } from 'health/shared/services/meals/meal.interface';
import { MealsService } from 'health/shared/services/meals/meals.service';
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
    // Share for multi async in template
    this.meals$ = this.store.select('meals').pipe(share<Meal[]>());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
