import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './core';
import { AppStoreModule } from './core/@ngrx/app-store.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProductsModule,
    AppStoreModule,
    AppRoutingModule,
  ],
  providers: [...httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
