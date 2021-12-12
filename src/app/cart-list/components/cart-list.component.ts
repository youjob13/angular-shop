import { Component, OnInit } from '@angular/core';
import {
  Category,
  IProduct,
} from 'src/app/products/components/product/product.model';
import { CartListService } from '../services/cart-list.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss', '../../app.component.scss'],
})
export class CartListComponent implements OnInit {
  cartList: IProduct[] = [];

  constructor(private cartListService: CartListService) {}

  ngOnInit(): void {
    this.cartList = this.cartListService.getCartList();
  }

  trackByProductName(index: number, product: IProduct): string {
    return product.name;
  }
}
