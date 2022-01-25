import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { Category, IProduct } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: IProduct[] = [
    {
      id: '1',
      name: 'iPhone 13',
      description: 'Beautiful design',
      price: 1000,
      category: Category.SMARTPHONE,
      isAvailable: true,
    },
    {
      id: '2',
      name: 'MSI sx109',
      description: 'The best laptop 2021',
      price: 500,
      category: Category.LAPTOP,
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Acer',
      description: 'Incredible machine',
      price: 1300,
      category: Category.LAPTOP,
      isAvailable: false,
    },
    {
      id: '4',
      name: 'Bpple watch',
      description: 'Beautiful design',
      price: 500,
      category: Category.OTHER,
      isAvailable: true,
    },
    {
      id: '5',
      name: 'Apple watch',
      description: 'Incredible machine',
      price: 500,
      category: Category.LAPTOP,
      isAvailable: true,
    },
  ];

  constructor() {}

  getProducts(): Observable<IProduct[]> {
    return of(this.products);
  }
}
