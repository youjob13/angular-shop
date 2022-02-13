import { IProduct } from '../../shared/models/product.model';

import { Inject, Injectable } from '@angular/core';

import { ProductsPromiseService } from './products-promise.service';
import { CartListService } from 'src/app/cart/services/cart-list.service';
import { GENERATOR_ID_TOKEN } from '../products.module';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public products!: IProduct[];
  public loading = false;

  constructor(
    @Inject(GENERATOR_ID_TOKEN) private generatorFunc: (n: number) => string,
    private productsPromiseService: ProductsPromiseService,
    private cartService: CartListService
  ) {}

  async getProducts(): Promise<IProduct[]> {
    try {
      this.loading = true;

      if (this.products?.length) {
        return Promise.resolve(this.products);
      }

      const products = await this.productsPromiseService.loadProduct();
      this.products = [...products];
      return products;
    } catch (err) {
      console.error(err);
      throw new Error();
    } finally {
      this.loading = false;
    }
  }

  getProduct(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
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
