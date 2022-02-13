import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import {
  catchError,
  delay,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { IProduct } from 'src/app/shared/models/product.model';

import { IPurchasedProduct } from '../cart.model';
import { CartObservableService } from './cart-observable.service';

const initialProductCount = 1;

@Injectable({
  providedIn: 'root',
})
export class CartListService {
  private cartProducts$$ = new BehaviorSubject<IPurchasedProduct[]>([]);
  public cartProducts$!: Observable<IPurchasedProduct[]>;

  private totalQuantity$$ = new BehaviorSubject<number>(0);
  public totalQuantity$!: Observable<number>;

  private totalSum$$ = new BehaviorSubject<number>(0);
  public totalSum$!: Observable<number>;

  private loading$$ = new BehaviorSubject<boolean>(false);
  public loading$!: Observable<boolean>;

  constructor(private cartObservableService: CartObservableService) {
    this.loadProducts();

    this.cartProducts$ = this.cartProducts$$.asObservable();
    this.totalSum$ = this.totalSum$$.pipe(distinctUntilChanged());
    this.totalQuantity$ = this.totalQuantity$$.pipe(distinctUntilChanged());
    this.loading$ = this.loading$$.pipe(distinctUntilChanged());
  }

  private loadProducts(): void {
    this.loading$$.next(true);
    this.cartObservableService
      .loadCart()
      .pipe(
        delay(1000),
        take(1),
        tap((cartProducts) => this.updateCartProductsInState(cartProducts)),
        catchError((err) => throwError(err)),
        finalize(() => this.loading$$.next(false))
      )
      .subscribe();
  }

  updateProducts(updatedProduct: IProduct): void {
    const recoveryProducts = this.cartProducts$$.getValue();
    const updatedCartProducts = recoveryProducts.map((product) => {
      if (product.id === updatedProduct.id) {
        const updatedCartProduct = {
          ...updatedProduct,
          count: product.count,
        };
        return updatedCartProduct;
      }

      return product;
    });

    this.cartProducts$$
      .pipe(
        take(1),
        tap(() => this.updateCartProductsInState(updatedCartProducts)),
        switchMap(() => {
          const updatedCartProduct = updatedCartProducts.find(
            (product) => product.id === updatedProduct.id
          );
          if (updatedCartProduct) {
            return this.cartObservableService.updateProduct(updatedCartProduct);
          }
          return EMPTY;
        }),
        catchError((err) => {
          this.updateCartProductsInState(recoveryProducts);
          return throwError(err);
        })
      )
      .subscribe();
  }

  removeAllProducts(): void {
    const cartProducts = this.cartProducts$$.getValue();

    this.cartProducts$$
      .pipe(
        take(1),
        tap(() => this.updateCartProductsInState([])),
        switchMap(() => this.cartObservableService.clearCart(cartProducts)),
        catchError((err) => {
          this.updateCartProductsInState(cartProducts);
          return throwError(err);
        })
      )
      .subscribe();
  }

  removeProduct(productId: string): void {
    const recoveryProducts = this.cartProducts$$.getValue();

    this.cartProducts$$
      .pipe(
        take(1),
        tap((products) => {
          const updatedCartProducts = products.filter(
            (product) => product.id !== productId
          );
          return this.updateCartProductsInState(updatedCartProducts);
        }),
        switchMap(() => this.cartObservableService.deleteProduct(productId)),
        catchError((err) => {
          this.cartProducts$$.next(recoveryProducts);
          return throwError(err);
        })
      )
      .subscribe();
  }

  isEmptyCart(): Observable<boolean> {
    return this.cartProducts$$.pipe(
      take(1),
      map((products) => !!products.length)
    );
  }

  addProduct(newProduct: IProduct): void {
    const recoveryProducts = this.cartProducts$$.getValue();
    const currentProduct = recoveryProducts.find(
      (product) => product.id === newProduct.id
    );

    this.cartProducts$$
      .pipe(
        take(1),
        tap(() => {
          if (!currentProduct) {
            const updatedCartProducts = [
              ...recoveryProducts,
              { ...newProduct, count: initialProductCount },
            ];

            this.updateCartProductsInState(updatedCartProducts);
          } else {
            this.changeQuantity(currentProduct.id, currentProduct.count + 1);
          }
        }),
        switchMap(() => {
          if (!currentProduct) {
            return this.cartObservableService.addProduct({
              ...newProduct,
              count: initialProductCount,
            });
          } else {
            return this.cartObservableService.updateProduct({
              ...currentProduct,
              count: currentProduct.count + 1,
            });
          }
        }),
        catchError((err) => {
          this.updateCartProductsInState(recoveryProducts);
          return throwError(err);
        })
      )
      .subscribe();
  }

  changeQuantity(productId: string, productCount: number): void {
    this.cartProducts$$
      .pipe(
        take(1),
        tap((products) => {
          const updatedCartProducts = products.map((product) =>
            product.id === productId
              ? { ...product, count: productCount }
              : product
          );

          this.updateCartProductsInState(updatedCartProducts);
        })
      )
      .subscribe();
  }

  private updateCartProductsInState(
    updatedCartProducts: IPurchasedProduct[]
  ): void {
    this.cartProducts$$.next(updatedCartProducts);

    this.calculateTotalQuantity();
    this.calculateTotalSum();
  }

  private calculateTotalQuantity(): void {
    this.cartProducts$$
      .pipe(
        take(1),
        tap((products) => {
          const quantity = products.reduce(
            (count, product) =>
              product.count > product.quantity
                ? product.quantity
                : product.count + count,
            0
          );

          this.totalQuantity$$.next(quantity);
        })
      )
      .subscribe();
  }

  private calculateTotalSum(): void {
    this.cartProducts$$
      .pipe(
        take(1),
        tap((products) => {
          const sum = products.reduce(
            (amount, product) =>
              amount +
              product.price *
                (product.count > product.quantity
                  ? product.quantity
                  : product.count),
            0
          );

          this.totalSum$$.next(sum);
        })
      )
      .subscribe();
  }
}
