import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from '.';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class ProductsStoreModule {}
