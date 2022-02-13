import { InjectionToken } from '@angular/core';

export const ConstantsService = {
  App: 'MyShop',
  Ver: '1.0',
  API_URL: 'http://localhost:3000/',
  CartDataEndpoint: 'cart',
  ProductsDataEndpoint: 'products',
  AppSettings: 'AppSettings',
};

export const CONSTANTS = new InjectionToken<ConstantsServiceType>(
  'constantsService',
  {
    providedIn: 'root',
    factory: () => ConstantsService,
  }
);

export type ConstantsServiceType = typeof ConstantsService;
