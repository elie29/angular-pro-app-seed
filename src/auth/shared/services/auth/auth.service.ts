import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Promise } from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(private af: AngularFireAuth) {
    console.log('AuthService');
  }

  createUser(email: string, password: string): Promise<any> {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }
}
