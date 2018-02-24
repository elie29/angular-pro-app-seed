import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <div class="wrapper">
        <h1>Hello Ultimate Angular!</h1>
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {
  constructor() {}
}
