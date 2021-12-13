import { Injectable } from '@angular/core';
import { Category, IProduct } from '../components/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: IProduct[] = [
    {
      name: 'IPhone 13',
      description: 'Beautiful design',
      price: 1000,
      category: Category.SMARTPHONE,
      isAvailable: true,
    },
    {
      name: 'MSI sx109',
      description: 'The best laptop 2021',
      price: 2300,
      category: Category.LAPTOP,
      isAvailable: true,
    },
    {
      name: 'Acer',
      description: 'Incredible machine',
      price: 1300,
      category: Category.LAPTOP,
      isAvailable: false,
    },
    {
      name: 'IPhone 13',
      description: 'Beautiful design',
      price: 1000,
      category: Category.SMARTPHONE,
      isAvailable: true,
    },
    {
      name: 'Apple watch',
      description: 'Beautiful design',
      price: 500,
      category: Category.OTHER,
      isAvailable: true,
    },
  ];

  constructor() {}

  getProducts() {
    return this.products;
  }
}
