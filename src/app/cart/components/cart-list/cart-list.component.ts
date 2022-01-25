import { AfterContentChecked, Component } from '@angular/core';

import { ChangedProductCount, IPurchasedProduct } from '../../cart.model';
import { CartListService } from '../../services/cart-list.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements AfterContentChecked {
  cartProducts: IPurchasedProduct[] = [];
  totalQuantity: number = 0;
  totalSum: number = 0;
  isEmptyCart: boolean = false;
  isAsc: boolean = false;
  sortBy: string | null = null;
  sortOptions: string[] = ['price', 'count', 'name'];

  constructor(private cartListService: CartListService) {}

  ngAfterContentChecked(): void {
    this.cartProducts = this.cartListService.getProducts();
    this.isEmptyCart = this.cartListService.isEmptyCart();
    this.totalQuantity = this.cartListService.totalQuantity;
    this.totalSum = this.cartListService.totalSum;
  }

  onChangeProductQuantity({
    productId,
    productCount,
  }: ChangedProductCount): void {
    this.cartListService.changeQuantity(productId, productCount);
  }

  clearCart(): void {
    this.cartListService.removeAllProducts();
  }

  onRemoveProductFromCart(productId: string): void {
    this.cartListService.removeProduct(productId);
  }

  trackByProductId(index: number, product: IPurchasedProduct): string {
    return product.id;
  }
}
