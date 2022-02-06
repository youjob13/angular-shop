import { Component } from '@angular/core';
import { CartListService } from '../../services/cart-list.service';
import { ChangedProductCount, IPurchasedProduct } from '../../cart.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent {
  isAsc: boolean = false;
  sortBy: string | null = null;
  sortOptions: string[] = ['price', 'count', 'name'];

  constructor(public cartListService: CartListService) {}

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
