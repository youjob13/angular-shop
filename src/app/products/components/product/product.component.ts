import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProduct } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: IProduct;
  @Output() addProductToCart: EventEmitter<IProduct> =
    new EventEmitter<IProduct>();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    console.log('Product purchased');
    this.addProductToCart.emit(this.product);
  }
}
