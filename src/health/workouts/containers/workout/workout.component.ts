import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from 'health/shared/services/workouts/workout.interface';
import { WorkoutsService } from 'health/shared/services/workouts/workouts.service';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'workout',
  styleUrls: ['workout.component.scss'],
  templateUrl: 'workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<any>;
  private subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap(params => {
        return this.workoutsService.getWorkout(params.id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    // we use the snapshot, the static call
    const id = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(id, event);
    this.backToWorkouts();
  }

  async removeWorkout() {
    const id = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(id);
    this.backToWorkouts();
  }

  private backToWorkouts(): void {
    this.router.navigate(['/', 'health', 'workouts']);
  }
}
