import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'example-two',
  template: `
    <div>
    <h3>Change detection push</h3>
      {{ user | json }}
      <button (click)="change()">Change User</button>
    </div>
  `,
  // When user change and when its content change
  // Angular is faster onPush strategy
  // As we are expecting immutable object
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleTwoComponent {
  @Input() user: any;

  change(): void {
    this.user.age = Math.floor(Math.random() * 100) + 1; // example one will detect this change
  }
}
