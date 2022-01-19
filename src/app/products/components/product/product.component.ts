import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IProduct } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() product!: IProduct;
  @Output() addProductToCart: EventEmitter<IProduct> =
    new EventEmitter<IProduct>();

  constructor() {}

  onAddToCart(): void {
    console.log('Product purchased');
    this.addProductToCart.emit(this.product);
  }
}
