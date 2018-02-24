import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), AuthModule],
  declarations: [AppComponent],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}

/*
var config = {
  apiKey: "AIzaSyAiMwzt3Jmo8V2Ds-hZkwZzlI2HdezmMxs",
  authDomain: "fitness-app-4c13a.firebaseapp.com",
  databaseURL: "https://fitness-app-4c13a.firebaseio.com",
  projectId: "fitness-app-4c13a",
  storageBucket: "fitness-app-4c13a.appspot.com",
  messagingSenderId: "534483643011"
};
*/
