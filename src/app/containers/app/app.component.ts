import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <button (click)="addProp()">Add property</button>
    <button (click)="changeUser()">Change User</button>
    <button (click)="changeName()">Change Name</button>
    <example-one [user]="user"></example-one>
    <example-two [user]="user"></example-two>
  `
})
export class AppComponent {
  user: any = {
    name: 'Elie',
    age: 38
  };

  addProp(): void {
    this.user.email = 'elie29@gmail.com';
  }

  changeUser(): void {
    this.user = {
      name: 'Todd',
      age: 32
    };
  }

  changeName(): void {
    this.user.name = 'Nat';
  }
}
