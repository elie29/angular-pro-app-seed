import { Component, Input } from '@angular/core';

@Component({
  selector: 'example-one',
  template: `
    <div>
      {{ user | json }}
    </div>
  `
})
export class ExampleOneComponent {
  @Input() user: any;
}
