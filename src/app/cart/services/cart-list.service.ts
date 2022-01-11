import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { IPurchasedProduct } from '../cart.model';

const initialProductCount = 1;

@Injectable({
  providedIn: 'root',
})
export class CartListService {
  private cartList: IPurchasedProduct[] = [];

  constructor() {}

  changeProductCount(product: IPurchasedProduct): void {
    this.cartList = this.cartList.map((productInCart) =>
      productInCart.id === product.id ? product : productInCart
    );
  }

  removeProduct(productId: string): void {
    const productIndex = this.cartList.findIndex(
      (product) => product.id === productId
    );
    this.cartList.splice(productIndex, 1);
  }

  getCartList(): IPurchasedProduct[] {
    return this.cartList;
  }

  addProduct(newProduct: IProduct): void {
    const currentProduct = this.cartList.find(
      (product) => product.id === newProduct.id
    );

    if (!currentProduct) {
      this.cartList.push({ ...newProduct, count: initialProductCount });
    } else {
      this.cartList = this.cartList.map((product) =>
        product.id === currentProduct.id
          ? { ...product, count: product.count + 1 }
          : product
      );
    }
  }

  calculateProductsNumber(): number {
    return this.cartList.reduce((count, product) => product.count + count, 0);
  }

  calculateAmountOfPurchasedGoods(): number {
    return this.cartList.reduce(
      (amount, product) => amount + product.price * product.count,
      0
    );
  }
}
