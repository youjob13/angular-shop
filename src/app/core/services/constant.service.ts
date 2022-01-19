import { InjectionToken } from '@angular/core';

export const ConstantsService = {
  App: 'MyShop',
  Ver: '1.0',
  API_URL: 'https://my-shop.com',
};

export const CONSTANTS = new InjectionToken<ConstantsServiceType>(
  'constantsService'
);

export type ConstantsServiceType = typeof ConstantsService;
