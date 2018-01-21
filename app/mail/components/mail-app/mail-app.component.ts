import { Component } from '@angular/core';

@Component({
  selector: 'mail-app',
  styleUrls: ['mail-app.component.scss'],
  template: `
    <div class="mail">
      <router-outlet
        (activate)="onActivate($event)"
        (deactivate)="onDeactivate($event)"
      >
      </router-outlet>
    </div>
  `
})
export class MailAppComponent {
  onActivate(event): void {
    console.log('Activate ', event);
  }

  onDeactivate(event): void {
    console.log('Deactivate ', event);
  }
}
