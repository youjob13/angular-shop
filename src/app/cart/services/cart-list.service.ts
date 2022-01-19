import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { IPurchasedProduct } from '../cart.model';

const initialProductCount = 1;

@Injectable({
  providedIn: 'root',
})
export class CartListService {
  private cartProducts: IPurchasedProduct[] = [];
  private _totalQuantity: number = 0;
  private _totalSum: number = 0;

  constructor() {}

  get totalQuantity(): number {
    return this._totalQuantity;
  }

  private set totalQuantity(count: number) {
    this._totalQuantity = count;
  }

  get totalSum(): number {
    return this._totalSum;
  }

  private set totalSum(count: number) {
    this._totalSum = count;
  }

  removeAllProducts(): void {
    this.cartProducts = [];

    this.updateCartData();
  }

  removeProduct(productId: string): void {
    this.cartProducts = this.cartProducts.filter(
      (product) => product.id !== productId
    );

    this.updateCartData();
  }

  getProducts(): IPurchasedProduct[] {
    return this.cartProducts;
  }

  isEmptyCart(): boolean {
    return !!this.cartProducts.length;
  }

  addProduct(newProduct: IProduct): void {
    const currentProduct = this.cartProducts.find(
      (product) => product.id === newProduct.id
    );

    if (!currentProduct) {
      this.cartProducts = [
        ...this.cartProducts,
        { ...newProduct, count: initialProductCount },
      ];
      this.updateCartData();
    } else {
      this.changeQuantity(currentProduct.id, currentProduct.count + 1);
    }

    console.log(this.cartProducts);
  }

  changeQuantity(productId: string, productCount: number): void {
    this.cartProducts = this.cartProducts.map((product) =>
      product.id === productId
        ? {
            ...product,
            count: productCount,
          }
        : product
    );

    this.updateCartData();
  }

  private updateCartData(): void {
    this.calculateTotalQuantity();
    this.calculateTotalSum();
  }

  private calculateTotalQuantity(): void {
    this.totalQuantity = this.cartProducts.reduce(
      (count, product) => product.count + count,
      0
    );
  }

  private calculateTotalSum(): void {
    this.totalSum = this.cartProducts.reduce(
      (amount, product) => amount + product.price * product.count,
      0
    );
  }
}
