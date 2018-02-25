import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  styleUrls: ['app-nav.component.scss'],
  // We have no input in this component, angular doesn't need to watch it out
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="/health/schedule" routerLinkActive="active">Schedule</a>
        <a routerLink="/health/meals" routerLinkActive="active">Meals</a>
        <a routerLink="/health/workouts" routerLinkActive="active">Workouts</a>
      </div>
    </div>
  `
})
export class AppNavComponent {}
