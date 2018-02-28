import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'auth/shared/services';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { Store } from 'store';

import { Meal } from './meal.interface';

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

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    return this.list.remove(key);
  }

  getMeal(key: string): Observable<any> {
    if (!key) {
      return of({});
    }
    return this.store
      .select('meals')
      .pipe(
        filter(Boolean),
        map((meals: Meal[]) => meals.find(meal => meal.$key === key))
      );
  }
}
