import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IPurchasedProduct } from '../../cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss', '../../../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  @Output() changeGoodsNumber: EventEmitter<IPurchasedProduct> =
    new EventEmitter<IPurchasedProduct>();
  @Output() removeProductFromCart: EventEmitter<string> =
    new EventEmitter<string>();
  @Input() product!: IPurchasedProduct;

  constructor() {}

  onChangeGoodsNumber(event: Event): void {
    const target = event.target as HTMLInputElement;
    const productCount = Number(target.value);
    this.changeGoodsNumber.emit({ ...this.product, count: productCount });
  }

  onRemoveProductFromCart(): void {
    this.removeProductFromCart.emit(this.product.id);
  }
}
