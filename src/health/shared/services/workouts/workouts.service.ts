import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'auth/shared/services';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { Store } from 'store';

import { Workout } from './workout.interface';

@Injectable()
export class WorkoutsService {
  workouts$: Observable<Workout[]> = this.list.pipe(
    tap(workouts => this.store.set('workouts', workouts))
  );

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  private get list() {
    return this.db.list(`workouts/${this.uid}`);
  }

  get uid() {
    // User is autheticated
    return this.authService.user.uid;
  }

  /**
   * Returns thenable
   */
  addWorkout(workout: Workout) {
    return this.list.push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.list.remove(key);
  }

  getWorkout(key: string): Observable<any> {
    if (!key) {
      return of({});
    }
    return this.store
      .select('workouts')
      .pipe(
        filter(Boolean),
        map((workouts: Workout[]) =>
          workouts.find(workout => workout.$key === key)
        )
      );
  }
}
