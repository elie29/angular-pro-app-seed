import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { AuthFormComponent } from '../../components/auth-form.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div [style.display]="'block'">
      <!-- it is for grouping some element -->
      <ng-container
        [ngTemplateOutlet]="tpl"
        [ngTemplateOutletContext]="ctx"
      >
      </ng-container>
      <ng-template #tpl let-name let-location="location">
        {{ name }}, {{ location }}
      </ng-template>
    </div>
  `
})
export class AppComponent {
  ctx = {
    $implicit: 'Elie',
    location: 'Paris - France'
  };
}
