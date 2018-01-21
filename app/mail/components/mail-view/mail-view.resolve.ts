import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Mail } from '../../models/mail.interface';
import { MailService } from '../../services/mail.service';

@Injectable()
export class MailViewResolve implements Resolve<Mail> {
  constructor(private mailService: MailService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Mail> {
    const folder = route.parent.firstChild.params.name; // to grab inbox or trash
    const id = route.params.id;
    return this.mailService.getMessage(folder, id);
  }
}
