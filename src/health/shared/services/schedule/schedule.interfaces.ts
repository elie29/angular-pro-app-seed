import { Meal } from 'health/shared/services/meals/meal.interface';
import { Workout } from 'health/shared/services/Workouts/Workout.interface';

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any; // a lookup hook
}
