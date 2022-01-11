import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { CartListService } from '../../services/cart-list.service';
import { IPurchasedProduct } from '../../cart.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss', '../../../app.component.scss'],
})
export class CartListComponent implements AfterContentChecked {
  cartList: IPurchasedProduct[] = [];
  goodsNumber: number = 0;
  amountOfPurchasedGoods: number = 0;

  constructor(private cartListService: CartListService) {}

  ngAfterContentChecked(): void {
    this.cartList = this.cartListService.getCartList();
    this.goodsNumber = this.cartListService.calculateProductsNumber();
    this.amountOfPurchasedGoods =
      this.cartListService.calculateAmountOfPurchasedGoods();
  }

  changeProductCount(product: IPurchasedProduct): void {
    this.cartListService.changeProductCount(product);
  }

  removeProductFromCart(productId: string): void {
    console.log(productId);
    this.cartListService.removeProduct(productId);
  }

  trackByProductId(index: number, product: IPurchasedProduct): string {
    return product.id;
  }
}
