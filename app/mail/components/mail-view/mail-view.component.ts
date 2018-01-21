import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators/pluck';
import { Observable } from 'rxjs/Observable';
import { Mail } from '../../models/mail.interface';

@Component({
  selector: 'app-view',
  styleUrls: ['mail-view.component.scss'],
  template: `
    <div class="mail-view" *ngIf="message | async as mail">
      <h2>{{ mail.from }}</h2>
      <p>{{ mail.summary }}</p>
      <span>{{ mail.timestamp | date:'shortTime' }}</span>
    </div>
  `
})
export class MailViewComponent {
  message: Observable<Mail>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // result will be in a message inside data as configured in mail.module.ts
    this.message = this.route.data.pipe(pluck('message'));
  }
}
