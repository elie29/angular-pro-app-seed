import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Promise } from 'firebase/app';
import { tap } from 'rxjs/operators/tap';
import { Store } from 'store';

import { User } from '../user/user.interface';

@Injectable()
export class AuthService {
  auth$ = this.af.authState.pipe(
    tap(val => {
      if (!val) {
        return this.setStore(null);
      }
      return this.setStore({
        email: val.email,
        uid: val.uid,
        authenticated: true
      });
    })
  );

  constructor(private af: AngularFireAuth, private store: Store) {}

  createUser(email: string, password: string): Promise<any> {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(): Promise<any> {
    return this.af.auth.signOut();
  }

  private setStore(user: User) {
    this.store.set('user', user);
    return true;
  }
}
