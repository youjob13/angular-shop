import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as RouterActions from './router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private location: Location,
    private router: Router
  ) {}

  back$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.Back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  navigateOutlet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.NavigateOutlet),
        tap((action) => {
          const { outlets } = action;
          this.router.navigate([{ outlets }]);
        })
      ),
    { dispatch: false }
  );

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.Navigate),
        tap((action) => {
          const { path, queryParams, extras } = action;
          this.router.navigate(path, {
            queryParams,
            ...extras,
          });
        })
      ),
    { dispatch: false }
  );
}
