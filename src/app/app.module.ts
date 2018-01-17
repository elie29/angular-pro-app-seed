import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Store } from 'store';

import { AuthFormComponent } from './components/auth-form.component';
import { AuthMessageComponent } from './components/auth-message.component';
import { AuthRememberComponent } from './components/auth-remember.component';
import { AppComponent } from './containers/app/app.component';

export const ROUTES: Routes = [];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(ROUTES)],
  declarations: [
    AppComponent,
    AuthFormComponent,
    AuthRememberComponent,
    AuthMessageComponent
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}
