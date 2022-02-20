import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const Back = createAction('[Router] BACK');
export const Navigate = createAction(
  '[Router] NAVIGATE',
  props<{
    path: any[];
    queryParams?: object;
    extras?: NavigationExtras;
  }>()
);
export const NavigateOutlet = createAction(
  '[Router] NAVIGATE_OUTLET',
  props<{
    outlets: { [key: string]: string | null };
  }>()
);
