import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessOrderComponent } from './component/process-order/process-order.component';
import { OrdersRoutingModule } from './orders.routing';

@NgModule({
  declarations: [ProcessOrderComponent, OrdersRoutingModule.components],
  imports: [CommonModule, OrdersRoutingModule],
})
export class OrdersModule {}
