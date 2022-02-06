import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CartItemComponent } from './components';
import { CartRoutingModule } from './cart.routing';

@NgModule({
  declarations: [CartItemComponent, CartRoutingModule.components],
  imports: [CommonModule, SharedModule, CartRoutingModule],
})
export class CartListModule {}
