import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../@ngrx/app.state';
import { AuthService } from '../services';
import * as RouterActions from '../@ngrx/router/router.actions';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAdmin = this.authService.checkRole();

    if (isAdmin) {
      return true;
    }

    alert("You don't have any access");
    this.store.dispatch(RouterActions.Navigate({ path: ['forbidden'] }));
    return false;
  }
}
