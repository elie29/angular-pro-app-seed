import { Component } from '@angular/core';

@Component({
  selector: 'mail-app',
  styleUrls: ['mail-app.component.scss'],
  template: `
    <div class="mail">
      <!-- Here we inject MailFolderComponent -->
      <router-outlet></router-outlet>
    </div>
    <div class="mail">
      <!-- Here we inject MailViewComponent -->
      <router-outlet name="pane"></router-outlet>
    <div>
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
