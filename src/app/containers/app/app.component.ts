import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { AuthFormComponent } from '../../components/auth-form.component';
import { User } from '../../components/user.interface';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <div #entry></div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {
  @ViewChild('entry', { read: ViewContainerRef })
  entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterContentInit(): void {
    const authForm = this.resolver.resolveComponentFactory(AuthFormComponent);
    const component = this.entry.createComponent(authForm);
    component.instance.title = 'Create User';
    component.instance.submitted.subscribe(console.log);
  }
}
