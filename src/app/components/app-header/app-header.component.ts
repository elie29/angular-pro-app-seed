import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { User } from '../../../auth/shared/services';

@Component({
  selector: 'app-header',
  styleUrls: ['app-header.component.scss'],
  // Stateless component
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="/img/logo.svg">
        <div
          class="app-header__user-info"
          *ngIf="user?.authenticated">
          <span (click)="logoutUser()" title="Logout"></span>
        </div>
      </div>
    </div>
  `
})
export class AppHeaderComponent {
  @Input() user: User;
  @Output() logout = new EventEmitter<any>();

  logoutUser(): void {
    this.logout.emit();
  }
}
