import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from 'auth/auth.module';
import { HealthModule } from 'health/health.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';

// routes
const ROUTES: Routes = [
  // fallback routes
  { path: '**', pathMatch: 'full', redirectTo: 'health' }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      preloadingStrategy: PreloadAllModules
    }),
    AuthModule,
    HealthModule
  ],
  declarations: [AppComponent, AppHeaderComponent, AppNavComponent],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}
