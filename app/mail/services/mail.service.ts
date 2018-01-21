import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { Mail } from '../models/mail.interface';

@Injectable()
export class MailService {
  constructor(private http: HttpClient) {}

  getFolder(folder: string): Observable<Mail[]> {
    // Instead of using httpParams
    return this.http.get<Mail[]>(`/api/messages?folder=${folder}`);
  }

  getMessage(folder: string, id: string): Observable<Mail> {
    return (
      this.http
        .get<Mail>(`/api/messages?folder=${folder}&id=${id}`)
        // result is an array of message or we need to grap only one
        .pipe(map(res => res[0]))
    );
  }
}
