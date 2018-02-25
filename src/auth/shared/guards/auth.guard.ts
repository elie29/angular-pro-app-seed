import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { AuthService } from 'auth/shared/services';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * canActivate could be used along any paths
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.authState.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/auth/login']);
        }
        return !!user;
      })
    );
  }

  /**
   * canLoad should be put along with loadChildren
   * so canActivate is better
   */
  canLoad(route: Route): Observable<boolean> {
    return this.canActivate(null, null);
  }
}
