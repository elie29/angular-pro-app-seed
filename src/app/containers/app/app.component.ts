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
      <div #entry></div>
      <ng-template #tpl let-name let-location="location">
        {{ name }}, {{ location }}
      </ng-template>
    </div>
  `
})
export class AppComponent implements AfterContentInit {
  @ViewChild('entry', { read: ViewContainerRef })
  private entry: ViewContainerRef;

  private component: ComponentRef<AuthFormComponent>;

  @ViewChild('tpl') tpl: TemplateRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterContentInit(): void {
    const authForm = this.resolver.resolveComponentFactory(AuthFormComponent);
    this.component = this.entry.createComponent(authForm, 0);
    this.component.instance.title = 'Create User';
    this.component.instance.submitted.subscribe(console.log);

    // we need to use createEmbededView instead of createComponent
    this.entry.createEmbeddedView(this.tpl, {
      $implicit: 'Elie',
      location: 'Paris - France'
    });
  }
}
