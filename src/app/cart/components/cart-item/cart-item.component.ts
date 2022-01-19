import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ChangedProductCount, IPurchasedProduct } from '../../cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Input() product!: IPurchasedProduct;
  @Output() changeProductQuantity: EventEmitter<ChangedProductCount> =
    new EventEmitter<ChangedProductCount>();
  @Output() removeProductFromCart: EventEmitter<string> =
    new EventEmitter<string>();

  constructor() {}

  onChangeGoodsNumber(event: Event): void {
    const target = event.target as HTMLInputElement;
    const productCount = Number(target.value);

    this.changeProductQuantity.emit({
      productId: this.product.id,
      productCount,
    });
  }

  onRemoveProductFromCart(): void {
    this.removeProductFromCart.emit(this.product.id);
  }
}
