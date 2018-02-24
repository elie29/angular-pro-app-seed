import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from './shared/shared.module';

// Auth module routes
const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
      }
    ]
  }
];

const CONFIG: FirebaseAppConfig = {
  apiKey: 'AIzaSyAiMwzt3Jmo8V2Ds-hZkwZzlI2HdezmMxs',
  authDomain: 'fitness-app-4c13a.firebaseapp.com',
  databaseURL: 'https://fitness-app-4c13a.firebaseio.com',
  projectId: 'fitness-app-4c13a',
  storageBucket: 'fitness-app-4c13a.appspot.com',
  messagingSenderId: '534483643011'
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot() // Same instance of AuthService is used among login and register
  ]
})
export class AuthModule {}
