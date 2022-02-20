import { IProduct } from '../../shared/models/product.model';

import { Inject, Injectable } from '@angular/core';

import { ProductsPromiseService } from './products-promise.service';
import { CartListService } from 'src/app/cart/services/cart-list.service';
import { GENERATOR_ID_TOKEN } from '../products.module';
import { AppState } from 'src/app/core/@ngrx/app.state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public products!: IProduct[];

  constructor(
    @Inject(GENERATOR_ID_TOKEN) private generatorFunc: (n: number) => string,
    private productsPromiseService: ProductsPromiseService,
    private cartService: CartListService,
    private store: Store<AppState>
  ) {}

  async getProducts(): Promise<IProduct[]> {
    try {
      if (this.products?.length) {
        return Promise.resolve(this.products);
      }

      const products = await this.productsPromiseService.loadProduct();
      this.products = [...products];
      return products;
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }

  getProduct(id: string): Observable<IProduct | undefined> {
    return this.store
      .select('products')
      .pipe(
        map((productsState) =>
          productsState.products.find((product) => product.id === id)
        )
      );
  }

  async addProduct(productData: IProduct): Promise<void> {
    try {
      const id = this.generatorFunc(32);

      const newProduct = {
        ...productData,
        id,
      };

      const newProductFromApi = await this.productsPromiseService.addProduct(
        newProduct
      );

      this.products = [...this.products, newProductFromApi];
    } catch (err) {
      console.error(err);
    }
  }

  async updateProduct(
    productToUpdate: IProduct,
    updates: Partial<IProduct>
  ): Promise<void> {
    try {
      const updatedProduct = {
        ...productToUpdate,
        ...updates,
      };

      const updatedProductFromApi =
        await this.productsPromiseService.updateProduct(updatedProduct);

      this.cartService.updateProducts(updatedProductFromApi);

      this.products = this.products.map((product) =>
        product.id === updatedProductFromApi.id
          ? updatedProductFromApi
          : product
      );
    } catch (err) {
      console.error(err);
    }
  }
}
