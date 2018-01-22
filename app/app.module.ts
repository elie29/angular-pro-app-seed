import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MailModule } from './mail/mail.module';
import { DashboardModule } from './dashboard/dashboard.module';

export const ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule
  },
  { path: '**', redirectTo: '/mail/folder/inbox', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MailModule,
    DashboardModule,
    RouterModule.forRoot(ROUTES, { enableTracing: false })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
