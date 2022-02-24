import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessOrderComponent } from './component/process-order/process-order.component';
import { OrdersRoutingModule } from './orders.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ProcessOrderComponent, OrdersRoutingModule.components],
  imports: [CommonModule, OrdersRoutingModule, ReactiveFormsModule, CoreModule],
})
export class OrdersModule {}
