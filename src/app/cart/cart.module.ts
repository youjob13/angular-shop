import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CartItemComponent } from './components';
import { CartRoutingModule } from './cart.routing';

@NgModule({
  declarations: [CartItemComponent, CartRoutingModule.components],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, CartRoutingModule],
})
export class CartListModule {}
