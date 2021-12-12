import { Injectable } from '@angular/core';
import {
  Category,
  IProduct,
} from 'src/app/products/components/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartListService {
  private cartList: IProduct[] = [
    {
      name: 'Honor',
      description: 'simple smartphone',
      price: 200,
      category: Category.SMARTPHONE,
      isAvailable: true,
    },
    {
      name: 'Honor',
      description: 'simple smartphone',
      price: 200,
      category: Category.SMARTPHONE,
      isAvailable: true,
    },
  ];

  constructor() {}

  getCartList() {
    return this.cartList;
  }

  addProduct(product: IProduct) {
    this.cartList.push(product);
  }
}
