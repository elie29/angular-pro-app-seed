import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

import { AuthService } from 'auth/shared/services';
import { Meal } from './meal.interface';
import { Store } from 'store';

@Injectable()
export class MealsService {
  meal$: Observable<Meal[]> = this.db
    .list(`meals/${this.uid}`)
    .pipe(tap(meals => this.store.set('meals', meals)));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    // User is autheticated
    return this.authService.user.uid;
  }
}
