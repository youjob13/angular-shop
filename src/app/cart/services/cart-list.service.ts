import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  finalize,
  map,
  take,
  tap,
} from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core';
import { IProduct } from 'src/app/shared/models/product.model';

import { IPurchasedProduct } from '../cart.model';

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

  constructor(private localStorageService: LocalStorageService) {
    this.loadProducts();

    this.cartProducts$ = this.cartProducts$$.asObservable();
    this.totalSum$ = this.totalSum$$.pipe(distinctUntilChanged());
    this.totalQuantity$ = this.totalQuantity$$.pipe(distinctUntilChanged());
    this.loading$ = this.loading$$.pipe(distinctUntilChanged());
  }

  loadProducts(): void {
    this.loading$$.next(true);
    of(this.localStorageService.getItem('cart'))
      .pipe(
        delay(1000),
        take(1),
        tap((products) => {
          const cartProducts = products
            ? (JSON.parse(products) as IPurchasedProduct[])
            : [];

          this.updateCartProductsInState(cartProducts);
        }),
        finalize(() => this.loading$$.next(false))
      )
      .subscribe();
  }

  updateProducts(updatedProduct: IProduct): void {
    this.cartProducts$$
      .pipe(
        take(1),
        tap((products) => {
          const updatedCartProducts = products.map((product) =>
            product.id === updatedProduct.id
              ? { ...updatedProduct, count: product.count }
              : product
          );

          this.updateCartProductsInState(updatedCartProducts);
          this.localStorageService.setItem('cart', updatedCartProducts);
        })
      )
      .subscribe();
  }

  removeAllProducts(): void {
    this.localStorageService.setItem('cart', []);
    this.updateCartProductsInState([]);
  }

  removeProduct(productId: string): void {
    this.cartProducts$$
      .pipe(
        take(1),
        tap((products) => {
          const updatedCartProducts = products.filter(
            (product) => product.id !== productId
          );

          this.updateCartProductsInState(updatedCartProducts);
          this.localStorageService.setItem('cart', updatedCartProducts);
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
    this.cartProducts$$
      .pipe(
        take(1),
        tap((products) => {
          const currentProduct = products.find(
            (product) => product.id === newProduct.id
          );

          if (!currentProduct) {
            const updatedCartProducts = [
              ...products,
              { ...newProduct, count: initialProductCount },
            ];

            this.updateCartProductsInState(updatedCartProducts);
            this.localStorageService.setItem('cart', updatedCartProducts);
          } else {
            this.changeQuantity(currentProduct.id, currentProduct.count + 1);
          }
        })
      )
      .subscribe(() => this.loadProducts());
  }

  changeQuantity(productId: string, productCount: number): void {
    this.cartProducts$$
      .pipe(
        take(1),
        tap((products) => {
          const updatedCartProducts = products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  count: productCount,
                }
              : product
          );

          this.updateCartProductsInState(updatedCartProducts);
          this.localStorageService.setItem('cart', updatedCartProducts);
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
