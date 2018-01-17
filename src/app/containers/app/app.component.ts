import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <label>Credit Card Number</label>
      <input type="text" placeholder="Enter 16-digit credit card" credit-card/>
    </div>
  `
})
export class AppComponent {}
