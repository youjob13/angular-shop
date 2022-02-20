import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { ProductsPromiseService } from 'src/app/products/services/products-promise.service';
import { IProduct } from 'src/app/shared/models/product.model';
import * as ProductsActions from './products.actions';
import * as RouterActions from '../router/router.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsHttp: ProductsPromiseService
  ) {}

  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap((action) =>
        this.productsHttp
          .loadProduct()
          .then((products) => ProductsActions.getProductsSuccess({ products }))
          .catch((error) => ProductsActions.getProductsError({ error }))
      ),
      map((products) => products),
      catchError((err) => throwError(err))
    )
  );

  addProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.addProduct),
      map((action) => action.product),
      concatMap((product: IProduct) =>
        this.productsHttp
          .addProduct(product)
          .then((product) => {
            // this.router.navigate(['/admin/products']);
            return ProductsActions.addProductSuccess({ product });
          })
          .catch((error) => ProductsActions.addProductError({ error }))
      )
    )
  );

  addUpdateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.addProduct, ProductsActions.updateProduct),
      map((action) => RouterActions.Navigate({ path: ['/admin/products'] }))
    )
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      switchMap((action) =>
        this.productsHttp
          .updateProduct(action.updatedProduct)
          .then((updatedProductFromAPI) => {
            return ProductsActions.updateProductSuccess({
              updatedProduct: updatedProductFromAPI,
            });
          })
          .catch((error) => ProductsActions.updateProductError({ error }))
      )
    )
  );
}
