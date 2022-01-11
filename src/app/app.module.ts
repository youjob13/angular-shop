import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartListModule } from './cart/cart-list.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartListModule,
    ProductsModule,
    OrdersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
