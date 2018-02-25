import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators/share';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { Store } from 'store';

import { AuthService, User } from 'auth/shared/services';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <app-header
        [user]="user$ | async"
        (logout)="onLogout()"
        >
      </app-header>
      <app-nav
        *ngIf="(user$ | async)?.authenticated"
        >
      </app-nav>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  user$: Observable<User>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // No need to destroy because it is our main app, but it is cleaner
    this.authService.auth$.pipe(takeUntil(this.destroy$)).subscribe();
    // 1. use share and async in multiplaces in template
    this.user$ = this.store.select('user').pipe(share<User>());

    // 2. inject a user inside subscibe
    // this.store.select<User>('user').subscribe(user => (this.user = user));
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.complete();
  }

  async onLogout() {
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
