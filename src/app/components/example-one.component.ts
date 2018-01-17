import { Component, Input } from '@angular/core';

@Component({
  selector: 'example-one',
  template: `
    <div>
      <h3>Change detection default</h3>
      {{ user | json }}
      <button (click)="change()">Change User</button>
    </div>
  `
})
export class ExampleOneComponent {
  @Input() user: any;

  change(): void {
    this.user.age = Math.floor(Math.random() * 100) + 1; //  example two won't detect this change
  }
}
