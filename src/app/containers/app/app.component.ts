import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { AuthFormComponent } from '../../components/auth-form.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <div><button (click)="destroy()">Destroy</button></div>
      <div #entry></div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {
  @ViewChild('entry', { read: ViewContainerRef })
  private entry: ViewContainerRef;

  private component: ComponentRef<AuthFormComponent>;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterContentInit(): void {
    const authForm = this.resolver.resolveComponentFactory(AuthFormComponent);
    this.component = this.entry.createComponent(authForm);
    this.component.instance.title = 'Create User';
    this.component.instance.submitted.subscribe(console.log);
  }

  destroy(): void {
    this.component.destroy();
  }
}
