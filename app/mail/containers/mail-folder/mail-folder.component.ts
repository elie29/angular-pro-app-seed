import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators/pluck';

import { Mail } from '../../models/mail.interface';

@Component({
  selector: 'mail-folder',
  styleUrls: ['mail-folder.component.scss'],
  template: `
    <h2>{{ title | async }}</h2>
    <mail-item
      *ngFor="let message of (messages | async)"
      [message]="message">
    </mail-item>
  `
})
export class MailFolderComponent implements OnInit {
  messages: Observable<Mail[]>;
  title: Observable<string>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // pluck as map(result => result.messages) useful for object
    this.messages = this.route.data.pipe(pluck('messages'));
    this.title = this.route.params.pipe(pluck('name'));
  }
}
