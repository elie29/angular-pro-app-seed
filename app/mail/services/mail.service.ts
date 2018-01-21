import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Mail } from '../models/mail.interface';

@Injectable()
export class MailServcie {
  constructor(private http: HttpClient) {}

  getFolder(folder: string): Observable<Mail[]> {
    // Instead of using httpParams
    return this.http.get<Mail[]>(`/api/messages?folder=${folder}`);
  }
}
