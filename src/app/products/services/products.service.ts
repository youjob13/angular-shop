import { IProduct } from '../../shared/models/product.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  finalize,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core';

import { Inject, Injectable } from '@angular/core';

import { CartListService } from 'src/app/cart/services/cart-list.service';
import { GENERATOR_ID_TOKEN } from '../products.module';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products$$ = new BehaviorSubject<IProduct[]>([]);
  public products$!: Observable<IProduct[]>;

  private loading$$ = new BehaviorSubject<boolean>(false);
  public loading$!: Observable<boolean>;

  constructor(
    @Inject(GENERATOR_ID_TOKEN) private generatorFunc: (n: number) => string,
    private localStorageService: LocalStorageService,
    private cartService: CartListService
  ) {
    this.loadProducts();

    this.products$ = this.products$$.asObservable();
    this.loading$ = this.loading$$.pipe(distinctUntilChanged());
  }

  private loadProducts(): void {
    this.loading$$.next(true);

    of(this.localStorageService.getItem('products'))
      .pipe(
        delay(1000),
        take(1),
        finalize(() => this.loading$$.next(false))
      )
      .subscribe((products) =>
        this.products$$.next(
          products ? (JSON.parse(products) as IProduct[]) : []
        )
      );
  }

  getProduct(id: string): Observable<IProduct | undefined> {
    return this.products$.pipe(
      switchMap((products) => of(products.find((product) => product.id === id)))
    );
  }

  addProduct(productData: IProduct): void {
    const id = this.generatorFunc(32);

    const newProduct = {
      ...productData,
      id,
    };

    this.products$$
      .pipe(
        take(1),
        tap((products) => {
          const updatedProducts = [...products, newProduct];

          this.localStorageService.setItem('products', updatedProducts);
          return this.products$$.next(updatedProducts);
        })
      )
      .subscribe(() => this.loadProducts());
  }

  updateProduct(productToUpdate: IProduct, updates: Partial<IProduct>): void {
    const updatedProduct = {
      ...productToUpdate,
      ...updates,
    };

    this.products$$
      .pipe(
        take(1),
        tap((products) => {
          const updatedProducts = products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          );

          this.cartService.updateProducts(updatedProduct);

          this.localStorageService.setItem('products', updatedProducts);
          return this.products$$.next(updatedProducts);
        })
      )
      .subscribe(() => this.loadProducts());
  }
}
