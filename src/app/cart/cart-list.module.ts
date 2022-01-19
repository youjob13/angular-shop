import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
  declarations: [CartListComponent, CartItemComponent],
  exports: [CartListComponent],
  imports: [CommonModule, SharedModule],
})
export class CartListModule {}
