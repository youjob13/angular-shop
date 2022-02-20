import { EMPTY, Observable, of } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/@ngrx/app.state';
import { selectProductById } from 'src/app/core/@ngrx/products/products.selectors';
import * as ProductsAction from '../../core/@ngrx/products/products.actions';
import * as RouterAction from '../../core/@ngrx/router/router.actions';
@Injectable({
  providedIn: 'any',
})
export class ProductResolverGuard implements Resolve<Partial<IProduct>> {
  constructor(private store: Store<AppState>) {}

  resolve(): Observable<Partial<IProduct>> {
    return this.store.select(selectProductById).pipe(
      tap((product) =>
        this.store.dispatch(
          ProductsAction.setInitialProduct({ initialProduct: product })
        )
      ),
      switchMap((product: Partial<IProduct>) => {
        if (product) {
          return of(product);
        } else {
          this.store.dispatch(
            RouterAction.Navigate({ path: ['/admin/products'] })
          );
          return EMPTY;
        }
      }),
      take(1),
      catchError(() => {
        this.store.dispatch(
          RouterAction.Navigate({ path: ['/admin/products'] })
        );
        return EMPTY;
      })
    );
  }
}
