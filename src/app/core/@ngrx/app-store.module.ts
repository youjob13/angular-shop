import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ProductsStoreModule } from './products/products.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer, RouterEffects, routerReducers } from './router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      serializer: CustomSerializer,
    }),
    ProductsStoreModule,
  ],
})
export class AppStoreModule {}
