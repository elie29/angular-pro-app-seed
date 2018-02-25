import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

import { AuthService } from 'auth/shared/services';
import { Meal } from './meal.interface';
import { Store } from 'store';

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> = this.list.pipe(
    tap(meals => this.store.set('meals', meals))
  );

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  private get list() {
    return this.db.list(`meals/${this.uid}`);
  }

  get uid() {
    // User is autheticated
    return this.authService.user.uid;
  }

  /**
   * Returns thenable
   */
  addMeal(meal: Meal) {
    return this.list.push(meal);
  }
}
