import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MailModule } from './mail/mail.module';

export const ROUTES: Routes = [{ path: '**', redirectTo: 'folder/inbox' }];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MailModule,
    RouterModule.forRoot(ROUTES, { enableTracing: false })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
